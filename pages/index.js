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
        </Box>
        <Marquee>
          {products &&
            products.slice(0, 9).map((e) => (
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
                              width={200}
                              height={200}
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
                        fontSize={'15px'}
                        color="primary"
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
      </ShopLayout>
    </>
  );
}
