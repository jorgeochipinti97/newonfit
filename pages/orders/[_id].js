import { ShopLayout } from "@/components/layout/shopLayout";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const OrdersPage = () => {
  const { push, query } = useRouter();
  const [order, setOrder] = useState();
  useEffect(() => {
    query._id && getOrder();
  }, [query]);

  const getOrder = async () => {
    const data = await axios.get(`/api/orders?_id=${query._id}`);
    setOrder(data.data);
  };
  return (
    <ShopLayout>
      <div style={{ minHeight: "100vh", paddingTop: "100px" }}>
        <p
          style={{
            textAlign: "center",
            fontSize: "30px",
            marginRight: "2px",
            marginLeft: "2px",
          }}
        >
          ¡Muchas gracias por confiar en nosotros!
        </p>
        {order && (
          <div style={{ marginTop: "50px" }}>
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
                justifyContent: "center",
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
