import { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";

import { useRouter } from "next/router";

import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import { Elastic, gsap, Power4, Power1, Back } from "gsap";
import { CartList, OrderSummary } from "@/components/cart";
import { ShopLayout } from "@/components/layout/shopLayout";
import { CartContext } from "@/context/cart/CartContext";
import { FormCheckout } from "@/components/FormCheckout";
const CartPage = () => {
  gsap.registerPlugin(ScrollTrigger);

  const isMobile = useMediaQuery("(max-width:600px)");
  const [isCheckauto, setIsCheckaut] = useState(false);

  const { isLoaded, cart } = useContext(CartContext);
  const router = useRouter();

  useEffect(() => {
    isLoaded && cart.length === 0 && router.replace("/cart/empty");
  }, [isLoaded]);

  useEffect(() => {
    isCheckauto &&
      gsap.to(".containerCart", {
        transform: "scale(0)",
      });
    isCheckauto &&
      gsap.to(".containerCart", {
        display: "none",
        delay: 1,
      });
    isCheckauto &&
      gsap.to(".formContainerCart", {
        display: "flex",
        delay: 1.2,
      });
    isCheckauto &&
      gsap.to(".formContainerCart", {
        transform: "scale(1)",
        delay: 1.5,
      });
  }, [isCheckauto]);

  return (
    <ShopLayout
      title="Cart"
      pageDescription={"Carrito de compras de la tienda"}
    >

        <Box
          className="containerCart"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            width:'100vw'
          }}
        >
          <Box className="containerCart" sx={{ mx: 2, width: isMobile ? '90%':"50%" }}>
            <Card className="summary-card" sx={{ minHeight: "50vh" }}>
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
                  <Box sx={{ width: isMobile ? '100%':"60%" }}>
                    <CartList editable isMobile={isMobile} />
                  </Box>
                </Box>
                <Divider sx={{ my: 1 }} />

                <OrderSummary />

                <Box sx={{ pt: 2 }}>
                  <Button
                    color="secondary"
                    className="circular-btn"
                    fullWidth
                    onClick={() => setIsCheckaut(true)}
                  >
                    Checkout
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>
        <Box
          className="formContainerCart"
          sx={{
            transform: "scale(0)",
            pt: 10,pb:5,

            display: "none",
            width: "100vw",

            justifyContent: "center",
            alignItems:'center'
          }}
        >
          <div
            style={{
              width: isMobile ? '80%':"50%",
              borderRadius: "10px",
              backgroundColor: "white",
              padding: 5, height:'fit-content'
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "center", }}>
              <Box sx={{ width: "80%" }}>
                <OrderSummary />
              </Box>
            </Box>
            <FormCheckout />
          </div>
        </Box>

    </ShopLayout>
  );
};

export default CartPage;
