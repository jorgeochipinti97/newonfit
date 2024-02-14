// pages/api/cargaClientes.js
import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Prepara los datos para enviar a la API de Urbano
    const data = JSON.stringify(req.body);

    const config = {
      method: 'post',
      url: 'https://apis.urbano.com.ar/cargaCliente/',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
      maxBodyLength: Infinity,
    };

    try {
      const response = await axios(config);
      // Envía la respuesta de la API externa al cliente
      res.status(200).json(response.data);
    } catch (error) {
      console.error("Error al solicitar a la API externa:", error);
      res.status(error.response?.status || 500).json({ message: "Error al procesar la solicitud" });
    }
  } else {
    // Método no soportado
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
