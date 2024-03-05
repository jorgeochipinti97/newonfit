
import DiscountCodeOnfit from "@/Models/DiscountCodes";
import { db } from "@/database";


export default function handler(req, res) {
  switch (req.method) {
    case "POST":
      return createDiscount(req, res);
    case "GET":
      return getCodes(req, res);
    case "PUT":
      return updateCodeUsage(req, res);
    default:
      return res.status(400).json({ message: "Bad request" });
  }
}

const createDiscount = async (req, res) => {
  await db.connectDB();
  try {
    const newCode = new DiscountCodeOnfit({ ...req.body });

    await newCode.save();

    return res.status(201).json(newCode);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error.message || "Revise logs del servidor",
    });
  }
};

const getCodes = async (req, res) => {
  await db.connectDB();
  const { _id } = req.query; // Extrae el _id de la query si existe

  try {
    if (_id) {
      const order = await DiscountCodeOnfit.findById(_id).lean();
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      return res.status(200).json(order);
    } else {
      const orders = await DiscountCodeOnfit.find()
        .sort({ createdAt: "desc" })
        .lean();
      return res.status(200).json(orders);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || "Server error" });
  } finally {
  }
};
const updateCodeUsage = async (req, res) => {
  await db.connectDB();
  const { _id } = req.query; // Extrae el _id de la query si existe

  try {
    if (_id) {
      // Actualiza el campo isUsed del código de descuento a true
      const updatedCode = await DiscountCodeOnfit.findByIdAndUpdate(
        _id,
        { $set: { isUsed: true } },
        { new: true } // Devuelve el documento modificado
      );

      if (!updatedCode) {
        // Si no se encuentra el código de descuento, retorna un error 404
        return res.status(404).json({ message: "Discount code not found" });
      } else {
        // Si el código de descuento se actualizó correctamente, retorna una respuesta exitosa
        return res.status(200).json({ message: "Discount code usage updated successfully", code: updatedCode });
      }
    } else {
      // Si no se proporciona un _id en la query, retorna un error 400
      return res.status(400).json({ message: "Discount code ID is required" });
    }
  } catch (error) {
    console.error(error);
    // Retorna un error 500 si ocurre algún error en el servidor
    return res.status(500).json({ message: error.message || "Server error" });
  } finally {
    // Aquí podrías cerrar la conexión a la base de datos si es necesario
    // Por ejemplo: await db.disconnectDB();
  }
};
