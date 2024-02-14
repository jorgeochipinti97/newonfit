import ProductOnfit from "@/Models/Product";
import { db } from "@/database";

// Conexión a la base de datos
db.connectDB();

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return handleGet(req, res);
    case "PUT":
      return handleUpdateStock(req, res);
    default:
      res.status(405).json({ error: "Método no permitido" });
  }
} 

async function handleGet(req, res) {
  try {
    const productos = await ProductOnfit.find();
    console.log(productos)
    res.status(200).json(productos);
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    res.status(500).json({ error: "Error al obtener los productos" });
  }
}

async function handleUpdateStock(req, res) {
  const { _id, nombre, stock } = req.body;

  try {
    const product = await ProductOnfit.findOne({ _id });
    if (!product) {
      return res.status(400).json({ message: "Producto no encontrado" });
    }

    const talleIndex = product.talles.findIndex(
      (t) => t.nombre.toLowerCase() === nombre.toLowerCase()
    );
    if (talleIndex === -1) {
      return res.status(400).json({ message: "Talle no encontrado" });
    }

    // Asegurarse de restar la cantidad correctamente.
    product.talles[talleIndex].stock -= stock;
    if (product.talles[talleIndex].stock < 0) {
      // Aquí puedes decidir cómo manejar esta situación,
      // por ejemplo, ajustar a 0 o no permitir la operación.
      product.talles[talleIndex].stock = 0;
    }

    await product.save();
    res.status(200).json({ message: "Stock actualizado exitosamente" });
  } catch (error) {
    console.error("Error al actualizar el stock:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}
