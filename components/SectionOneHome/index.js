import { Box, Grid, Button, Typography } from "@mui/material";
import Image from "next/image";
import React, { useEffect } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useInView } from "react-intersection-observer";
import { gsap } from "gsap";
import { useRouter } from "next/router";

export const SectionOneHome = ({ isMobile }) => {
  const router = useRouter();
  gsap.registerPlugin(ScrollTrigger);
  const { ref, inView, entry } = useInView({
    threshold: 0.9,
    triggerOnce: true,
  });

  useEffect(() => {
    inView &&
      gsap.fromTo(
        ".sectionOne",
        { xPercent: -100 },
        { xPercent: 0, opacity: 1 }
      );
  }, [inView]);
  return (
    <>
      <Grid
        item
        sm={12}
        lg={12}
        xl={12}
        sx={{
          scrollSnapAlign: "start",
          scrollMarginTop: "20px",
          mt: isMobile ? 5 : 0,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          className="modern-gradient"
          style={{
            width: isMobile ? "98%" : "80%",
            display: "flex",
            borderRadius: isMobile ? "10px" : "90px",
            backgroundImage: isMobile
              ? "linear-gradient(to bottom, rgba(0,0,0,.3) 40%, black),linear-gradient(to bottom,rgba(0,0,0,0.8),rgba(0, 0, 0, 0.5)), url(https://res.cloudinary.com/dcvieavco/image/upload/v1678770903/all-over-print-recycled-unisex-sports-jersey-white-front-640d682e0e707_fxbjod.png)"
              : "none",
            backgroundSize: "cover",
          }}
          sx={{ py: isMobile ? 2 : 0 }}
        >
          <Box
            ref={ref}
            sx={{ textAlign: "center" }}
            display="flex"
            justifyContent="center"
          >
            <Image
              src="https://res.cloudinary.com/dcvieavco/image/upload/v1678770903/all-over-print-recycled-unisex-sports-jersey-white-front-640d682e0e707_fxbjod.png"
              width={500}
              height={500}
              alt="asd"
              style={{
                borderRadius: "80px",
                backgroundColor: "#f5f5f7",
                display: isMobile ? "none" : "auto",
              }}
            />
          </Box>
          <div
            ref={ref}
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              textAlign: "center",
              // opacity: 0,
            }}
          >
            <Typography
              sx={{
                mt: 1,
                width: "80%",
                color: "black",
                fontWeight: "700",
                color: "rgb(254, 221, 45)",
                lineHeight: "25px",
                fontFamily: "Lato",
              }}
              variant="h5"
            >
              Calidad Garantizada por OnFit
            </Typography>
            <Typography
              sx={{
                mt: 1,
                width: "80%",
                color: "black",
                fontSize: isMobile ? "12px" : "16px",
                color: "#f5f5f7",
              }}
              variant="body1"
            >
              Nos comprometemos a ofrecerte{" "}
              <span style={{ fontWeight: "700" }}>la más alta calidad</span>.
              Trabajamos con proveedores confiables y seleccionamos cada
              artículo de nuestra tienda con atención para{" "}
              <span style={{ fontWeight: "700" }}>
                {" "}
                garantizar tu satisfacción
              </span>{" "}
              y{" "}
              <span style={{ fontWeight: "700" }}>
                mejorar tu experiencia de entrenamiento
              </span>
              .
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Button
                size={isMobile ? "small" : "large"}
                onClick={() => router.push("/indumentaria")}
              >
                ¡Explorar ya!
              </Button>
            </Box>
          </div>
        </Box>
      </Grid>
    </>
  );
};
