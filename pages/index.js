import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import {
  Box,
  Grid,
  useMediaQuery,
} from "@mui/material";

import { ShopLayout } from "@/components/layout/shopLayout";
import { SectionOneHome } from "@/components/SectionOneHome";
import { SectionTwoHome } from "@/components/SectionTwoHome";
import { SectionThreeHome } from "@/components/SectionThreeHome";
import { SectionFourHome } from "@/components/SectionFourHome";

import { SectionOneResponsive } from "@/components/sectionOneResponsive";
import { SectionTwoResponsive } from "@/components/sectionTwoResponsive";
import { SectionThreeResponsive } from "@/components/sectionThreeResponsive";
import { SectionFourResponmsive } from "@/components/sectionFourResponsive";
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
          <HeroSectionComponent products={products.filter(e=> e.subcategoria == 'remera_oversize')} isMobile={isMobile} />

        </Box>
        <Grid container sx={{ display: isMobile ? "none" : "auto" }}>
          <SectionOneHome />
          <SectionTwoHome />
          <SectionThreeHome />
          <SectionFourHome />
        </Grid>
        <Box sx={{ my: 3, display: isMobile ? "auto" : "none" }}>
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
        </Box>
      </ShopLayout>
    </>
  );
}
