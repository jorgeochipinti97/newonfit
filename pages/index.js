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
import { useProduct } from "@/Hooks/UseProducts";

export default function Home() {
  const isMobile = useMediaQuery("(max-width:600px)");

  const { products, isLoading } = useProduct();


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
