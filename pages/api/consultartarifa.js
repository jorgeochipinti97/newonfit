// pages/api/proxyConsultaTarifa.js
import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Convertir el cuerpo de la solicitud a una cadena JSON
// a partir de los 3 42*54

    const config = {
      method: "post",
      url: "https://apis.urbano.com.ar/consulta_tarifa_rest/",
      headers: {
        "Content-Type": "application/json", // Especificar explícitamente el Content-Type
      },
      data: req.body,
      maxBodyLength: Infinity, // Si necesitas enviar cuerpos de solicitud muy grandes
    };

    try {
      const response = await axios(config);

      // Envía la respuesta de la API externa al cliente
      return res.status(200).json(response.data.valorTarifa);
    } catch (error) {
      console.error("Error al solicitar a la API externa:", error);
      return res
        .status(error.response?.status || 500)
        .json({ message: "Error al procesar la solicitud" });
    }
  } else {
    // Método no soportado
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
