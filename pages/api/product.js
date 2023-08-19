

import ProductOnfit from "@/Models/Product";
import { db } from "@/database";


// Conexión a la base de datos
db.connectDB();

export default async function handler(req, res) {
 if (req.method === "GET") {
    try {
      const productos = await ProductOnfit.find();

      res.status(200).json(productos);

    } catch (error) {
      console.error("Error al obtener los productos:", error);
      res.status(500).json({ error: "Error al obtener los productos" });
    }
  } else {
    res.status(405).json({ error: "Método no permitido" });
  }

}