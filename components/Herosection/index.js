import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";

import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  Container,
  Grid,
  Typography,
  capitalize,
} from "@mui/material";

import { useRouter } from "next/router";
import useRadialBackground from "@/Hooks/useRadialBackground";

export const HeroSectionComponent = ({ products, isMobile }) => {
  const { push } = useRouter();

  const radialStyle = useRadialBackground(isMobile);
  const scrollToElement = () => {
    const element = document.getElementById("sectionOne");
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  useEffect(() => {
    const link = document.querySelector('a[href="#sectionOne"]');
    if (link) {
      link.addEventListener("click", scrollToElement);
    }
  }, []);

  return (
    <section
      style={{
        color: "white",
        width: "100vw",
        minHeight: "100vh",

        display: "flex",
        flexDirection: "column",
      }}
    >
      <Container sx={{ pt: 10, width: "100%" }}>
        <Grid
          container
          spacing={6}
          justifyContent="center"
          sx={{ width: isMobile ? "100vw" : "80vw" }}
        >
          <Grid
            item
            xs={12}
            lg={6}
            xl={6}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div style={{ marginBottom: "1rem" }}>
              <Typography
                variant="h3"
                component="h1"
                style={{
                  fontWeight: "bold",
                  fontSize: "2.5rem",
                  color: "black",
                  lineHeight: "39px",
                  marginBottom: 10,
                }}
              >
                Eleva tu estilo, potencia tu rendimiento
              </Typography>
              <Typography
                variant="body1"
                style={{ maxWidth: "600px", color: "black" }}
              >
                Convierte tus Sueños Fitness en Realidad
              </Typography>
            </div>
            <div style={{ marginBottom: "1rem", color: "black" }}>
              <Typography variant="body1" style={{ fontSize: "1rem" }}>
                Estamos{" "}
                <span style={{ fontWeight: "700" }}> comprometidos </span>con tu{" "}
                <span style={{ fontWeight: 550 }}>bienestar y tu pasión</span>{" "}
                por el fitness. Ofrecemos una amplia gama de equipos deportivos
                y ropa de la marca OnFit para que{" "}
                <span style={{ fontWeight: "700" }}>alcances tus metas</span>.
                Ya sea que estés buscando entrenar en casa o en uno de nuestros
                gimnasios, ¡Te tenemos cubierto!{" "}
              </Typography>
            </div>
            <div>
              <Typography
                variant="subtitle1"
                sx={{ color: "black", fontSize: "20px" }}
              >
                {" "}
                Te presentamos nuestros diseños de selección.
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} lg={6} xl={6}>
            <Box style={{ width: isMobile ? "90vw" : "100%" }}>
              <video
                loop
                autoPlay
                controls
                muted
                playsInline
                alt="Hero"
                src="/video.mp4"
                style={{
                  width: "100%",
                  height: "auto",
                  maxWidth: "100%",
                  borderRadius: "10px",
                  objectFit: "cover",
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        <div style={{ width: "100%", marginTop: "50px", marginBottom: "50px" }}>
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            pagination={isMobile ? true : false}
            slidesPerView={isMobile ? 1.5 : 1.6}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
            }}
            modules={[EffectCoverflow, Pagination, Navigation]}
          >
            {products &&
              products.map((e) => (
                <SwiperSlide key={e.titulo}>
                  <Box
                    key={e.slug}
                    style={{
                      backgroundImage: `linear-gradient(to bottom, transparent 40%, black),linear-gradient(to bottom,rgba(0,0,0,0.8),rgba(0, 0, 0, 0.1)), url(${e.images[0]})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      borderRadius: "22px",
                      height: isMobile ? "70vh" : "auto",
                    }}
                  >
                    <div className="container">
                      <span className="loaderImage "></span>
                    </div>
                    <Card
                      sx={{
                        borderRadius: "22px",
                        background: "transparent",
                        m: 1,
                      }}
                    >
                      <CardActionArea sx={{ background: "transparent" }}>
                        <Box
                          sx={{
                            overflow: "hidden",
                            background: "transparent",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <CardMedia
                            sx={{
                              overflow: "hidden",
                              maxWidth: isMobile ? "100%" : "40%",
                              background: "transparent",
                            }}
                          >
                            <img
                              style={{
                                width: "100%",
                                height: { xs: "20vw", lg: "10vw" },
                                borderRadius: "9px",
                              }}
                              alt={e.titulo}
                              src={e.images[0]}
                            />
                          </CardMedia>
                        </Box>
                        <Box
                          display="flex"
                          justifyContent="center"
                          sx={{ overflow: "hidden", background: "transparent" }}
                        >
                          <Typography
                            variant="subtitle1"
                            textAlign={"center"}
                            fontWeight={700}
                            fontSize={"12px"}
                            color="primary"
                            sx={{
                              textShadow: "2px 2px 2px 4px",
                              width: "80%",
                              lineHeight: isMobile ? "25px" : "15px",
                              color: "#f5f5f7",
                              py: 2,
                              fontSize: isMobile ? "25px" : "30px",
                            }}
                          >
                            {capitalize(`${e.titulo}`)}
                          </Typography>
                        </Box>
                      </CardActionArea>
                      <Box
                        sx={{
                          display: "flex" ,
                          justifyContent: "center",
                          width: "100%",
                        }}
                      >
                        <Button sx={{mt:2,fontSize:'14px'}}>Ver más</Button>
                      </Box>
                    </Card>
                  </Box>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default HeroSectionComponent;
