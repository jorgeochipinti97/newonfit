import React, { useEffect } from "react";

import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import { Elastic, gsap, Power4, Power1, Back } from "gsap";
import { Box, Typography, useMediaQuery, Grid } from "@mui/material";

import { useInView } from "react-intersection-observer";

export const TextComponentHome = () => {
  const { ref, inView, entry } = useInView({
    threshold: 0.9,
    triggerOnce: true,
  });
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    gsap.fromTo(".textComponent", { xPercent: -100 }, { xPercent: 0 });
  }, [inView]);

  return (
    <>
      <Box
        sx={{ textAlign: "center", mb: 5 }}
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        className="textComponent"
      >
        <Typography
          sx={{ mt: 4, width: "80%", lineHeight: "23px" }}
          variant="subtitle1"
        >
          Descubre los Mejores Productos Fitness de OnFit, la Cadena de
          Gimnasios Líder en Buenos Aires{" "}
        </Typography>
        <Typography
          sx={{ mt: 1, width: "80%", fontSize: 15, lineHeight: "20px" }}
          variant="body1"
        >
          ¡Bienvenido la tienda en línea de OnFit! Te presentamos nuestra
          selección de productos de calidad que te ayudarán a alcanzar tus metas
          y mantener un estilo de vida saludable.
        </Typography>
      </Box>
    </>
  );
};
