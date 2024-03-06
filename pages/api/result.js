export default function handler(req, res) {
    if (req.method === 'POST') {
      // Para solicitudes POST, asumimos que Decidir envía datos de la transacción
      const body = req.body; // Asegúrate de parsear el body si es necesario
      console.log('Datos recibidos de Decidir:', body);
      
      // Aquí puedes añadir lógica para procesar los datos recibidos,
      // como guardarlos en una base de datos, realizar alguna validación, etc.
  
      // Envía una respuesta al servidor de Decidir
      res.status(200).json({ message: 'Datos recibidos con éxito' });
    } else if (req.method === 'GET') {
      // Para solicitudes GET, puedes manejar parámetros de consulta
      const { query } = req;
      console.log('Query params recibidos de Decidir:', query);
      
      // Similarmente, puedes añadir lógica para manejar estos parámetros aquí
  
      // Redirecciona al cliente o envía una respuesta
      res.status(200).json({ message: 'Consulta recibida con éxito' });
    } else {
      // Método no soportado (opcional)
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }