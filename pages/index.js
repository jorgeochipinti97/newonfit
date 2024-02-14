import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Box, useMediaQuery } from "@mui/material";

import { ShopLayout } from "@/components/layout/shopLayout";
import { SectionOneHome } from "@/components/SectionOneHome";
import { SectionTwoHome } from "@/components/SectionTwoHome";
import { SectionThreeHome } from "@/components/SectionThreeHome";

import axios from "axios";

import { HeroSectionComponent } from "@/components/Herosection";
import CountdownTimer from "@/components/Timer";

export default function Home() {
  const [products, setProducts] = useState([]);
  const isMobile = useMediaQuery("(max-width:600px)");
  const router = useRouter();

  const getProducts = async () => {
    const data = await axios.get("/api/product");
    setProducts(data.data);
  };
  useEffect(() => {
    getProducts();
  }, []);

  const axios = require("axios");

  async function generarToken() {
    try {
      const apiKey = "16e8508ea61d4c4d8093f16d8ee9a3c2"; // Reemplaza TU_API_KEY_AQUI con tu apiKey real
      const response = await axios.post(
        "https://ventasonline.payway.com.ar/api/v2/tokens",
        {
          card_number: "4507990000004905",
          card_expiration_month: "12",
          card_expiration_year: "30",
          security_code: "123",
          card_holder_name: "tarjeta Visa Crédito",
          card_holder_identification: {
            type: "dni",
            number: "23968498",
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            apikey: apiKey, // Usa la apiKey como un encabezado personalizado
          },
        }
      );
      console.log(response.data); // Aquí tendrás el token generado
    } catch (error) {
      console.error(error);
    }
  }



  const getZipValue = async () => {
    try {
      const response = await axios.post("/api/consultartarifa", {
        codigoPostal: 1842,
        pesoEspecifico: 1.5,
        pesoVolumetrico: 1.5,
        alto: 1,
        largo: 1,
        ancho: 1,
        autentificacion: {
          shipper: 3575,
          password: "yFXGj8WIrB8dNLH",
        },
      });

      console.log(response.data);
    } catch (error) {
      console.error("Error al solicitar tarifas:", error);
    }
  };

  return (
    <>
      <ShopLayout>
        <Box sx={{ scrollSnapAlign: "start" }}>
          <HeroSectionComponent
            products={products.filter(
              (e) => e.subcategoria == "remera_oversize"
            )}
            isMobile={isMobile}
          />
        </Box>

        {/* <SectionOneHome isMobile={isMobile} /> */}
        {/* <SectionTwoHome isMobile={isMobile} />
        <SectionThreeHome isMobile={isMobile} /> */}
        {/* <Box
          sx={{
            heigh: "100vh",
            width: "100vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CountdownTimer targetDate="2024-02-14T23:59:59" />
        </Box> */}
      </ShopLayout>
    </>
  );
}
