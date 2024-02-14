import { useContext, useEffect, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
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
import { FormularioTarjeta } from "@/components/PaymentForm";
const CartPage = () => {
  gsap.registerPlugin(ScrollTrigger);

  const isMobile = useMediaQuery("(max-width:600px)");
  
  const { isLoaded, cart, total, numberOfItems } = useContext(CartContext);
  const router = useRouter();

  // useEffect(() => {
  //   isLoaded && cart.length === 0 && router.replace("/cart/empty");
  // }, [isLoaded]);


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
          width: "100vw",
          paddingTop: "15vh",
        }}
      >
        <Box
          className="containerCart"
          sx={{ mx: 2, width: isMobile ? "90%" : "50%" }}
        >
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
                <Box sx={{ width: isMobile ? "100%" : "60%" }}>
                  <CartList isMobile={isMobile} editable />
                </Box>
              </Box>
              <Divider sx={{ my: 1 }} />

              <OrderSummary />
              <FormularioTarjeta
                total={total}
                cart={cart}
                numberOfItems={numberOfItems}
              />
            </CardContent>
          </Card>
        </Box>
      </Box>
      <Box
        className="formContainerCart"
        sx={{
          transform: "scale(0)",
          pt: 10,
          pb: 5,

          display: "none",
          width: "100vw",
          minHeight: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: isMobile ? "80%" : "50%",
            borderRadius: "10px",
            backgroundColor: "white",
            padding: 5,
            height: "fit-content",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box sx={{ width: "80%" }}>
              <div style={{display:'flex', justifyContent:'center'}}>
                <svg
                  width={30}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 48 48"
                  style={{ display: isMobile ? "auto" : "none" }}
                >
                  <g>
                    <path
                      fill="#fff"
                      fillOpacity="0.01"
                      d="M0 0H48V48H0z"
                    ></path>
                    <path
                      fill="#ffb22e"
                      stroke="#000"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="4"
                      d="M24 4l5.253 3.832 6.503-.012 1.997 6.188 5.268 3.812L41 24l2.021 6.18-5.268 3.812-1.997 6.188-6.503-.012L24 44l-5.253-3.832-6.503.012-1.997-6.188-5.268-3.812L7 24l-2.021-6.18 5.268-3.812 1.997-6.188 6.503.012L24 4z"
                    ></path>
                    <path
                      stroke="#000"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="4"
                      d="M17 24l5 5 10-10"
                    ></path>
                  </g>
                </svg>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "2px",
                }}
              >
                <Typography
                  sx={{
                    textAlign: "center",
                    fontSize: isMobile ? "18px" : "30px",
                    fontWeight: "600",
                    mr: 2,
                  }}
                >
                  Su pago fue procesado exitosamente
                </Typography>
                <svg
                  width={50}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 48 48"
                  style={{ display: isMobile ? "none" : "auto" }}
                >
                  <g>
                    <path
                      fill="#fff"
                      fillOpacity="0.01"
                      d="M0 0H48V48H0z"
                    ></path>
                    <path
                      fill="#ffb22e"
                      stroke="#000"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="4"
                      d="M24 4l5.253 3.832 6.503-.012 1.997 6.188 5.268 3.812L41 24l2.021 6.18-5.268 3.812-1.997 6.188-6.503-.012L24 44l-5.253-3.832-6.503.012-1.997-6.188-5.268-3.812L7 24l-2.021-6.18 5.268-3.812 1.997-6.188 6.503.012L24 4z"
                    ></path>
                    <path
                      stroke="#000"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="4"
                      d="M17 24l5 5 10-10"
                    ></path>
                  </g>
                </svg>
              </div>
              <Typography
                sx={{
                  textAlign: "center",
                  fontSize: isMobile ? "15px" : "20px",
                  fontWeight: "400",
                  mt: 2,
                }}
              >
                Le solicitamos que complete la siguiente información para
                coordinar la entrega.
              </Typography>
            </Box>
          </Box>
          <FormCheckout />
        </div>
      </Box>
    </ShopLayout>
  );
};

export default CartPage;
