import { useRouter } from "next/router";
import {  useEffect, useState } from "react";
import { Box,  useMediaQuery } from "@mui/material";

import { ShopLayout } from "@/components/layout/shopLayout";
import { SectionOneHome } from "@/components/SectionOneHome";
import { SectionTwoHome } from "@/components/SectionTwoHome";
import { SectionThreeHome } from "@/components/SectionThreeHome";

import axios from "axios";

import { HeroSectionComponent } from "@/components/Herosection";

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

        <SectionOneHome  isMobile={isMobile}/>
        <SectionTwoHome isMobile={isMobile}/>
        <SectionThreeHome isMobile={isMobile} />

        {/* <Box sx={{ my: 3, display: isMobile ? "auto" : "none" }}>
          <SectionOneResponsive />{" "}
        </Box>
        <Box sx={{ my: 3, display: isMobile ? "auto" : "none" }}>
          <SectionTwoResponsive />{" "}
        </Box>
        <Box sx={{ my: 3, display: isMobile ? "auto" : "none" }}>
          <SectionThreeResponsive />{" "}
        </Box>
        <Box sx={{ my: 3, display: isMobile ? "auto" : "none" }}>
          <SectionFourResponmsive />{" "}
        </Box> */}
      </ShopLayout>
    </>
  );
}
