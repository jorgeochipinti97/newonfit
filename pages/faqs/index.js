import { Box, Divider, Typography } from "@mui/material";
import QuizIcon from "@mui/icons-material/Quiz";

import { AccordionFaqs } from "@/components/AccordionFaqs";
import { ShopLayout } from "@/components/layout/shopLayout";

const FaqsPage = () => {
  return (
    <>
      <ShopLayout title="FAQS" pageDescription="faqs">
        <Box
          display="flex"
          justifyContent="center"
          sx={{ backgroundColor: "white", height: "100vh", pt: 15 }}
        >
          <Box sx={{ width: "100vw !important" }}>
            <Box display="flex" justifyContent="center" sx={{ pb: 2 }}>
              <Box display="flex">
                <QuizIcon />
                <Typography variant="h1" sx={{ ml: 2 }}>
                  Preguntas frecuentes
                </Typography>
              </Box>
            </Box>
            <Box>
              <AccordionFaqs
                pregunta="FACTURACIÓN"
                respuesta="Las facturas de las compras realizadas en Tienda Onfit te van a llegar a la casilla de correo electrónico con el que hiciste tu pedido. Por el momento, para compras online no emitimos facturas A, sólo FACTURA B Consumidor Final."
              />
              <Divider sx={{ my: 1, m: 2 }} />
            </Box>
            <Box>
              <AccordionFaqs
                pregunta="ENVIO"
                respuesta="Por favor, a la hora de completar tus datos de envío, verificá que la dirección esté completa y correcta. Agregá todos los datos extra necesarios para que el correo pueda identificar el domicilio: calle, número, torre, piso, departamento, calles aledañas, timbre especial, si es country o propiedad de difícil acceso, etc.

                Tené en cuenta que si el correo no encuentra tu domicilio, la entrega se puede atrasar o incluso cancelarse y volver a nuestro centro logístico."
              />
              <Divider sx={{ my: 1, m: 2 }} />
            </Box>
            <Box>
              <AccordionFaqs
                pregunta="PLAZOS DE ENVIO"
                respuesta="3 a 7 días hábiles: CABA, GBA
                5 a 9 días hábiles: Buenos Aires
                6 a 12 días hábiles: Resto del país
                12 a 20 días hábiles: Ushuaia"
              />
              <Divider sx={{ my: 1, m: 2 }} />
            </Box>
            <Box>
              <AccordionFaqs
                pregunta="SEGUIMIENTO DE PEDIDO"
                respuesta="Importante: Nuestros pedidos tienen un plazo de entre 24 y 72 horas hábiles para ser preparados y despachados luego de tener la confirmación de pago. NO se despachan inmediatamente al momento de la compra, y no trabajamos sábados, domingos ni feriados.

                Una vez que recibimos tu confirmación de pago, preparamos tu paquete lo antes posible.  Cuando esto suceda vas a recibir una notificación por e-mail con el número de seguimiento de tu pedido para identificarlo en la web del proveedor y seguirlo en tiempo real. ingresá el número 3563 antes de tu código de seguimiento para poder ver el desglose completo de los movimientos del paquete. ¡No te olvides de hacer clic en la lupa para poder visualizarlo!
                
                Si no recibís tu código de seguimiento por e-mail, podés contactarnos para que te lo facilitemos.
                
                Nuestro servicio logístico coordina automáticamente una segunda entrega si pasan por tu domicilio y no te encuentran. ¡Esto es sin cargo! Si querés coordinar una tercera entrega, esta ya pasa a tener costo, y tenés que gestionarla a través de nuestro equipo de Atención al Cliente."
              />
              <Divider sx={{ my: 1, m: 2 }} />
            </Box>
            <Box>
              <AccordionFaqs
                pregunta="¿TENÉS OTRAS CONSULTAS? CONTACTANOS"
                respuesta="Si tenés cualquier duda respecto al proceso de compra que no estén en este documento, o a un pedido que hayas realizado, no dudes en contactarte con nuestro equipo de Atención al Cliente.

                Te recordamos nuestro Instagram: @tiendaonfitarg y nuestro mail: tienda@onfit.com.ar
                
                Estamos de Lunes a Viernes (hábiles, no feriados) de 9 a 18 horas, ¡tu consulta no nos molesta!"
              />

            </Box>
          </Box>
        </Box>
      </ShopLayout>
    </>
  );
};

export default FaqsPage;
