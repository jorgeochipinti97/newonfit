import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Link,
  Typography,
  capitalize,
  useMediaQuery,
} from "@mui/material";

// import { CartContext } from "@/context";

// import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// import { Elastic, gsap, Power4, Power1, Back } from "gsap";
// import { FromCheckout } from "@/components/ui/FormCheckout";
import { ShopLayout } from "@/components/layout/shopLayout";
import { VideoComponent } from "@/components/VideoComponent";
import { TextComponentHome } from "@/components/TextComponentHome";
import { SectionOneHome } from "@/components/SectionOneHome";
import { SectionTwoHome } from "@/components/SectionTwoHome";
import { SectionThreeHome } from "@/components/SectionThreeHome";
import { SectionFourHome } from "@/components/SectionFourHome";
import { ProductList } from "@/components/Products/ProductList";
import { LoadingComponent } from "@/components/Loading";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import { Elastic, gsap, Power4, Power1, Back } from "gsap";
import { SectionOneResponsive } from "@/components/sectionOneResponsive";
import { SectionTwoResponsive } from "@/components/sectionTwoResponsive";
import { SectionThreeResponsive } from "@/components/sectionThreeResponsive";
import { SectionFourResponmsive } from "@/components/sectionFourResponsive";
import axios from "axios";
import Marquee from "react-fast-marquee";
import { ProductCard } from "@/components/Products/ProductCard";
import Image from "next/image";

export default function Home() {
  const [products, setProducts] = useState([]);
  gsap.registerPlugin(ScrollTrigger);
  const isMobile = useMediaQuery("(max-width:600px)");
  useEffect(() => {
    gsap.to(".loader", { transform: "scale(0)", delay: 2 });
    gsap.to(".loader", { display: "none", delay: 2.5 });
    gsap.to(".mainContent", { transform: "scale(1)", delay: 3 });
  }, []);
  let populares = [
    {
      description: "",
      images: [
        "https://res.cloudinary.com/dcvieavco/image/upload/v1678770982/stainless-steel-water-bottle-black-17oz-front-640d672f77c6b_gxmaz7.jpg",
        "https://res.cloudinary.com/dcvieavco/image/upload/v1678770983/stainless-steel-water-bottle-black-17oz-front-640d670f8245a_lj8ojc.jpg",
      ],
      price: 100,
      slug: "botella_onfit",
      title: "Botella Onfit",
      type: "accesorios",
    },
    {
      description: "",
      images: [
        "https://res.cloudinary.com/dcvieavco/image/upload/v1678771025/AnyConv.com__D_NQ_NP_960149-MLA53279087293_012023-O_ezgqcy.jpg",
        "https://res.cloudinary.com/dcvieavco/image/upload/v1678771025/AnyConv.com__D_NQ_NP_960149-MLA53279087293_012023-O_ezgqcy.jpg",
      ],
      price: 100,
      slug: "caminadora",
      title: "Caminadora",
      type: "accesorios",
    },
    {
      description: "",
      images: [
        "https://res.cloudinary.com/dcvieavco/image/upload/v1678770960/all-over-print-longline-sports-bra-white-right-front-640d69387424b_fv2stz.jpg",
        "https://res.cloudinary.com/dcvieavco/image/upload/v1678770960/all-over-print-longline-sports-bra-white-left-front-640d6938741ee_tpl9t0.jpg",
        "https://res.cloudinary.com/dcvieavco/image/upload/v1678770960/all-over-print-longline-sports-bra-white-back-640d693874322_mqann7.jpg",
        "https://res.cloudinary.com/dcvieavco/image/upload/v1678770960/all-over-print-longline-sports-bra-white-front-640d693874177_rrrvw9.jpg",
      ],
      price: 100,
      slug: "corpinio_onfit",
      title: "corpiño onfit",
      type: "mujer",
    },
    {
      description: "",
      images: [
        "https://res.cloudinary.com/dcvieavco/image/upload/v1678770735/classic-dad-hat-white-front-640d61cc7646a_c94xtv.png",
        "https://res.cloudinary.com/dcvieavco/image/upload/v1678770732/classic-dad-hat-white-front-640d61cc7637e_bpo49l.png",
        "https://res.cloudinary.com/dcvieavco/image/upload/v1678770733/classic-dad-hat-black-front-640d61cc7617d_kxghde.png",
      ],
      price: 100,
      slug: "gorra_onfit",
      title: "gorra onfit",
      type: "accesorios",
    },
    {
      description: "",
      images: [
        "https://res.cloudinary.com/dcvieavco/image/upload/v1678770971/all-over-print-minimalist-backpack-white-right-640d60e9dfb83_1_wiw9vg.jpg",
        "https://res.cloudinary.com/dcvieavco/image/upload/v1678770971/all-over-print-minimalist-backpack-white-left-640d60e9dfae1_i9xmyt.jpg",
        "https://res.cloudinary.com/dcvieavco/image/upload/v1678770971/all-over-print-minimalist-backpack-white-right-640d60e9dfb83_ooyce4.jpg",
      ],
      price: 100,
      slug: "mochila_onfit",
      title: "mochila onfit",
      type: "accesorios",
    },
    {
      description: "",
      images: [
        "https://res.cloudinary.com/dcvieavco/image/upload/v1678770993/shaker_gqwwuu.jpg",
        "https://res.cloudinary.com/dcvieavco/image/upload/v1678770993/shaker_gqwwuu.jpg",
      ],
      price: 100,
      slug: "shaker",
      title: "shaker",
      type: "accesorios",
    },
  ];

  const getProducts = async () => {
    const data = await axios.get("/api/product");
    setProducts(data.data);
    console.log(data.data);
  };
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <ShopLayout>
        <Box className="loader">
          <LoadingComponent />
        </Box>
        <Box className="mainContent" sx={{ transform: "scale(0)" }}>
          <VideoComponent isMobile={isMobile} />
          <TextComponentHome />
          <Marquee>
            {products &&
              products.slice(0, 6).map((e) => (
                <Box key={e.slug}>
                  <Box
                    sx={{
                      overflow: "hidden",
                      transform: isMobile ? "scale(0.8)" : "",
                    }}
                  >
                    <Box sx={{ m: 1, overflow: "hidden" }}>
                      <Box
                        display="flex"
                        justifyContent="center"
                        sx={{ overflow: "hidden" }}
                      >
                        <Card>
                          <CardActionArea>
                            <CardMedia
                              component="div"
                              className="fadeIn"
                              sx={{ overflow: "hidden" }}
                            >
                              <Image
                                width={400}
                                height={400}
                                alt={e.titulo}
                                src={e.images[0]}
                              />
                            </CardMedia>
                          </CardActionArea>
                        </Card>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      <Box
                        display="flex"
                        justifyContent="center"
                        sx={{ overflow: "hidden" }}
                      >
                        <Typography
                          variant="subtitle1"
                          textAlign={"center"}
                          fontWeight={700}
                          color="primary"
                          sx={{}}
                        >
                          {capitalize(`${e.titulo}`)}
                        </Typography>
                      </Box>
                      <Box sx={{ overflow: "hidden" }}>
                        <Box
                          display="flex"
                          justifyContent="center"
                          sx={{ mb: 1, mt: 2, overflow: "hidden" }}
                        >
                          <Link sx={{ overflow: "hidden" }}>
                            <Button color="primary" sx={{ width: "130px" }}>
                              <Typography
                                variant="body2"
                                textAlign={"center"}
                                fontWeight={700}
                              >
                                {e.precio}
                              </Typography>
                            </Button>
                          </Link>
                        </Box>{" "}
                      </Box>
                    </Box>

                    <Divider sx={{ my: 2 }} />
                  </Box>
                </Box>
              ))}
          </Marquee>
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
        </Box>
      </ShopLayout>
    </>
  );
}
