import { ShopLayout } from "@/components/layout/shopLayout";
import { CartContext } from "@/context/cart/CartContext";
import { Box, Typography, useMediaQuery } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

const OrdersPage = () => {
  const { query } = useRouter();
  const [order, setOrder] = useState();
  const { resetCart } = useContext(CartContext);
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    query._id && getOrder();
  }, [query]);

  const getOrder = async () => {
    resetCart();
    const data = await axios.get(`/api/orders?_id=${query._id}`);
    setOrder(data.data);
  };
  return (
    <ShopLayout>
      <div style={{ minHeight: "100vh", paddingTop: "100px" }}>
        <Box sx={{ width: "100%" }}>
  
          <div style={{ display: "flex", justifyContent: "center" }}>
            <svg
              width={isMobile ? 50:30}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 48 48"
              style={{ display: isMobile ? "auto" : "none" }}
            >
              <g>
                <path fill="#fff" fillOpacity="0.01" d="M0 0H48V48H0z"></path>
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
              justifyContent:'center'
            }}
          >
            <Typography
              sx={{
                textAlign: "center",
                fontSize: isMobile ? "20px" : "30px",
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
                <path fill="#fff" fillOpacity="0.01" d="M0 0H48V48H0z"></path>
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
        </Box>
        {order && (
          <div style={{ marginTop: "20px" }}>
            <p
              style={{
                fontWeight: "400",
                fontSize: "20px",
                marginTop: "10px",
                textAlign: "center",
                marginBottom: "10px",
              }}
            >
              ID de la orden:{" "}
              <span style={{ fontWeight: "600" }}>{order._id} </span>
            </p>
            <p
              style={{
                fontWeight: "400",
                fontSize: "20px",
                marginTop: "10px",
                textAlign: "center",
                marginBottom: "10px",
              }}
            >
              Codigo de seguimiento : <br />
              <span style={{ fontWeight: "600" }}> {order.codGestion} </span>
            </p>
            <div
              style={{
                flexWrap: "wrap",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              {order.orderItems.map((e) => (
                <div
                  key={e._id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginTop: "50px",
                  }}
                >
                  <img src={e.image} width={200} />
                  <p style={{ fontSize: "20px", fontWeight: "600" }}>
                    {" "}
                    {e.title}
                  </p>
                  <p style={{ fontSize: "20px", fontWeight: "300" }}>
                    {" "}
                    Cantidad: {e.quantity}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ShopLayout>
  );
};

export default OrdersPage;
