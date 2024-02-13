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

  const getZipValue = async () => {
    try {
      const getValorTraifa = await axios.post(
        "https://apis.urbano.com.ar/consulta_tarifa_rest",
        {
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
        }
      );
      console.log(getValorTraifa);
    } catch (error) {
      console.error("Error realizando la solicitud:", error);
      // Aquí podrías manejar el error, como mostrar un mensaje al usuario
    }
  };
  
  return (
    <>
      {/* <ShopLayout> */}
        {/* <Box sx={{ scrollSnapAlign: "start" }}>
          <HeroSectionComponent
            products={products.filter(
              (e) => e.subcategoria == "remera_oversize"
            )}
            isMobile={isMobile}
          />
        </Box>
<button onClick={getZipValue}>obtener </button>
        <SectionOneHome  isMobile={isMobile}/>
        <SectionTwoHome isMobile={isMobile}/>
        <SectionThreeHome isMobile={isMobile} /> */}
        <Box
          sx={{
            heigh: "100vh",
            width: "100vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CountdownTimer targetDate="2024-02-14T23:59:59" />
        </Box>
      {/* </ShopLayout> */}
    </>
  );
}
