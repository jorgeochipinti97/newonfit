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
        display: "block",
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
      <Box className="containerCart" sx={{border:'1px solid black',display:'flex', justifyContent:'center', alignItems:'center', height:'100vh'}}>
        <Box className="containerCart" sx={{ mx: 2, width: "50%", }}>
          <Card className="summary-card" sx={{minHeight:'50vh',}}>
            <CardContent sx={{display:'flex', flexDirection:'column', justifyContent:'space-between', minHeight:'50vh'}}>
              <Typography variant="h2">Orden</Typography>

              <Divider sx={{ my: 1 }} />
              <Box sx={{ mx: 2 }}>
                <Box sx={{ width: "60%" }}>
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
        sx={{ transform: "scale(0)", pt: 10, mx: 2 ,display:'none'}}
      >
        <Box sx={{ width: "100vw", display: "flex", justifyContent: "center" }}>
          <Box sx={{ width: "20%" }}>
            <OrderSummary />
          </Box>
        </Box>
        <FormCheckout />
      </Box>
    </ShopLayout>
  );
};

export default CartPage;
