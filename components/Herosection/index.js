import React, { useEffect, useState } from "react";

import Link from "next/link";
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
import Marquee from "react-fast-marquee";
import { formattwo } from "@/utils/currency";
import Image from "next/image";
import { useRouter } from "next/router";

export const HeroSectionComponent = ({ products, isMobile }) => {
  const router = useRouter();
  const [scrolling, setScrolling] = useState(false);

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
        background:       "radial-gradient(ellipse at top, white, transparent), radial-gradient(ellipse at bottom, white, rgba(254, 221, 45,0.4));",
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
          sx={{ width: "80vw" }}
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
                  color: "black",lineHeight:'39px',marginBottom:10
                }}
              >
Eleva tu estilo, potencia tu rendimiento
              </Typography>
              <Typography variant="body1" style={{ maxWidth: "600px",color:'black' }}>
                Convierte tus Sueños Fitness en Realidad
              </Typography>
            </div>
            <div style={{ marginBottom: "1rem", color: "black" }}>
              <Typography variant="body1" style={{ fontSize: "1rem" }}>
                Estamos <span style={{fontWeight:'700'}}> comprometidos </span>con tu <span style={{fontWeight:550}}>bienestar y tu pasión</span> por el
                fitness. Ofrecemos una amplia gama de equipos deportivos y ropa
                de la marca OnFit para que <span style={{fontWeight:'700'}}>alcances tus metas</span>. Ya sea que estés
                buscando entrenar en casa o en uno de nuestros gimnasios, ¡Te
                tenemos cubierto!{" "}
              </Typography>
            </div>
            <div>
              <a href="#sectionOne">
                <Button variant="contained" color="primary">
                  ¡Descubre OnFit Ahora!
                </Button>
              </a>
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
          height: "content-fit",
          display: "flex",
          alignItems: "center",
          flex: 1,
          background: "transparent",
        }}
      >
        <Marquee style={{ background: "transparent", overflow: "hidden" }}>
          {products &&
            products.map((e) => (
              <Box
                key={e.slug}
                onClick={() => router.push(`/products/${e.slug}`)}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  mx: 5,
                  background: "white",
                  borderRadius: "30px",
                }}
              >
                <Card
                  sx={{
                    border: ".1px solid rgba(1,1,1,0.3)",
                    borderRadius: "30px",
                    maxWidth: { xs: "30vw", lg: "15vw" },
                    background: "transparent",
                  }}
                >
                  <div className="container">
                    <span className="loaderImage "></span>
                  </div>

                  <CardActionArea sx={{ background: "transparent" }}>
                    <Box sx={{ overflow: "hidden", background: "transparent" }}>
                      <CardMedia
                        sx={{
                          overflow: "hidden",
                          maxWidth: "100%",
                          background: "transparent",
                        }}
                      >
                        <img
                          style={{
                            width: "100%",
                            height: { xs: "30vw", lg: "10vw" },
                          }}
                          alt={e.titulo}
                          loading="lazy"
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
                          lineHeight: "15px",
                          py: 2,
                        }}
                      >
                        {capitalize(`${e.titulo}`)}
                      </Typography>
                    </Box>
                  </CardActionArea>
                </Card>
              </Box>
            ))}
        </Marquee>
      </div>
    </section>
  );
};

export default HeroSectionComponent;
