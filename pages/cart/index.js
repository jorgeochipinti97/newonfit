import { useContext, useEffect, useState } from "react";

import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Typography,
  useMediaQuery,
} from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import { Elastic, gsap, Power4, Power1, Back } from "gsap";
import { CartList, OrderSummary } from "@/components/cart";
import { ShopLayout } from "@/components/layout/shopLayout";
import { CartContext } from "@/context/cart/CartContext";
import { FormCheckout } from "@/components/FormCheckout";
import { FormularioTarjeta } from "@/components/PaymentForm";
import useGlobalForm from "@/Hooks/useGlobalForm";

const CartPage = () => {
  gsap.registerPlugin(ScrollTrigger);

  const isMobile = useMediaQuery("(max-width:600px)");

  const { cart, total, numberOfItems } = useContext(CartContext);

  const { updateFormData, submitGlobalForm } = useGlobalForm();

  const [isCheckout, setIsCheckout] = useState();

  // useEffect(() => {
  //   isLoaded && cart.length === 0 && router.replace("/cart/empty");
  // }, [isLoaded]);

  useEffect(() => {
    isCheckout &&
      gsap.to(".formOne", {
        opacity: 0,
      });
    isCheckout &&
      gsap.to(".formOne", {
        display: "none",
        delay: 1,
      });
    isCheckout &&
      gsap.to(".formTwo", {
        display: 'flex',
        delay:1.3,
        ease: Power1.easeIn,
      });
    isCheckout &&
      gsap.to(".formTwo", {
        opacity: 1,
        delay:1.5,
        ease: Power1.easeIn,
      });
  }, [isCheckout]);

  return (
    <ShopLayout
      title="Cart"
      pageDescription={"Carrito de compras de la tienda"}
    >
      <Box
        sx={{
          pt: 10,
          pb: 5,
          width: "100vw",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        className="formOne"
      >
        <Box
          sx={{
            width: isMobile ? "80%" : "50%",
            borderRadius: "10px",
            backgroundColor: "white",
            padding: 5,
            height: "fit-content",
          }}
        >
          <Box sx={{ width: isMobile ? "100%" : "60%" }}>
            <CartList isMobile={isMobile} editable />
          </Box>
          <Divider sx={{ my: 1 }} />

          <OrderSummary />
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Chip
              icon={<LocalShippingIcon />}
              color="success"
              label="Envio gratis a CABA y AMBA"
              sx={{ fontWeight: "800", px: 2 }}
              variant="outlined"
            />
          </Box>
          <Divider sx={{ my: 1 }} />
          <FormCheckout
            updateFormData={updateFormData}
            setIsCheckout={setIsCheckout}
          />
        </Box>
      </Box>
      <Box
        sx={{

          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          width: "100vw",
          paddingTop: "15vh",
          opacity:0,
          display:'none'
        }}
        className="formTwo"
      >
        <Box sx={{ mx: 2, width: isMobile ? "90%" : "50%" }}>
          <Card className="summary-card" sx={{ minHeight: "0vh" }}>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: "50vh",
              }}
            >
              <Typography variant="h2">Orden</Typography>

              <Divider sx={{ my: 1 }} />
              <Box sx={{ mx: 2 }}>
                <Box sx={{ width: isMobile ? "100%" : "60%" }}>
                  <CartList isMobile={isMobile} />
                </Box>
              </Box>
              <Divider sx={{ my: 1 }} />

              <OrderSummary />
              <FormularioTarjeta
                total={total}
                cart={cart}
                numberOfItems={numberOfItems}
                updateFormData={updateFormData}
                submitGlobalForm={submitGlobalForm}
              />
            </CardContent>
          </Card>
        </Box>
      </Box>
    </ShopLayout>
  );
};

export default CartPage;
