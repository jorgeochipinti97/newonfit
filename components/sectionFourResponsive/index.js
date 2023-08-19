import { Box, Grid, Button, Typography } from "@mui/material";
import Image from "next/image";
import React, { useEffect } from "react";

import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useInView } from "react-intersection-observer";
import { Elastic, gsap, Power4, Power1, Back } from "gsap";
import { useRouter } from "next/router";
export const SectionFourResponmsive = () => {
  const router = useRouter();
  gsap.registerPlugin(ScrollTrigger);

  const { ref, inView, entry } = useInView({
    threshold: 0.9,
    triggerOnce: true,
  });

  useEffect(() => {
    inView &&
      gsap.to(".SectionFourResponsive", { opacity: 1 });
  }, [inView]);

  return (
    <Box ref={ref} sx={{ opacity: 0 }} display="flex" flexDirection="column" className='SectionFourResponsive'>
      <Box sx={{ textAlign: "center" }} display="flex" justifyContent="center">
        <div data-aos="fade-left">
          <Image
            src="https://res.cloudinary.com/dcvieavco/image/upload/v1678771074/AnyConv.com__colageno_ex4c02.jpg"
            width={250}
            height={250}
            alt="asd"
          />
        </div>
      </Box>
      <div
        data-aos="fade-right"
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          textAlign: "center",
        }}
      >
        <Typography sx={{ mt: 1, width: "80%" }} variant="subtitle1">
          Suplementos de Calidad para Potenciar Tu Entrenamiento
        </Typography>
        <Typography sx={{ mt: 1, width: "80%" }} variant="body1">
          Descubre nuestra selección de suplementos de alta calidad diseñados
          para optimizar tu rendimiento y maximizar los resultados de tu
          entrenamiento. Te ofrecemos una amplia gama de suplementos esenciales,
          desde proteínas hasta pre-work y más, para ayudarte a alcanzar tus
          metas fitness de manera efectiva.{" "}
        </Typography>
        <Box sx={{ mt: 5 }}>
          <Button
            color="secondary"
            size="large"
            onClick={() => router.push("/suplementos")}
          >
            ¡Potenciarme ahora!
          </Button>
        </Box>
      </div>
    </Box>
  );
};
