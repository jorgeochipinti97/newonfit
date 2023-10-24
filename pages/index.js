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
import { formattwo } from "@/utils/currency";

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
          <VideoComponent isMobile={isMobile} />
          <TextComponentHome />
        </Box>
        <Box
          sx={{
            scrollSnapAlign: "start",
            background:
              "radial-gradient(ellipse at top, pink, transparent), radial-gradient(ellipse at bottom, white, rgb(254, 221, 45));",
            py: 2,
          }}
        >
          <Marquee>
            {products &&
              products.slice(0, 9).map((e) => (
                <Box
                  key={e.slug}
                  onClick={() => router.push(`/products/${e.slug}`)}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    cursor: "pointer",
                  }}
                >
                  <Box
                    sx={{
                      overflow: "hidden",
                      transform: isMobile ? "scale(0.8)" : "",
                      borderRadius: "30px 30px 20px 20px",
                      border: "1px solid black",
                      backdropFilter: "  saturate(150%)",
                      backgroundColor: "rgba(255,255,255,.4)",
                      mx: 2,
                    }}
                  >
                    <Box sx={{ overflow: "hidden" }}>
                      <Card
                        sx={{
                          border: ".1px solid black",
                          borderRadius: "30px",
                        }}
                      >
                        <CardActionArea>
                          <Box sx={{ overflow: "hidden" }}>
                            <CardMedia sx={{ overflow: "hidden" }}>
                              <Image
                                width={200}
                                height={200}
                                alt={e.titulo}
                                src={e.images[0]}
                              />
                            </CardMedia>
                          </Box>
                        </CardActionArea>
                      </Card>
                    </Box>
                    <Box
                      sx={{
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
                          fontSize={"15px"}
                          color="primary"
                          sx={{ textShadow: "2px 2px 2px 4px", width: "80%" }}
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
                            <Button color="success" sx={{ width: "130px" }}>
                              <Typography
                                variant="body2"
                                textAlign={"center"}
                                fontWeight={700}
                              >
                                {formattwo(e.precio)}
                              </Typography>
                            </Button>
                          </Link>
                        </Box>{" "}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              ))}
          </Marquee>
        </Box>
        <Divider sx={{ my: 2, scrollSnapAlign: "start" }} />
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
