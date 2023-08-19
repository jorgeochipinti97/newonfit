import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import React, { useEffect } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import { useInView } from "react-intersection-observer";

import { Elastic, gsap, Power4, Power1, Back } from "gsap";
import { useRouter } from "next/router";
export const SectionTwoResponsive = () => {
  const router = useRouter();
  gsap.registerPlugin(ScrollTrigger);
  const { ref, inView, entry } = useInView({
    threshold: 0.9,
    triggerOnce: true,
  });
  useEffect(() => {
    inView &&
      gsap.fromTo(
        ".sectionTwoResponsive",
        { xPercent: 100 },
        { xPercent: 0, opacity: 1 }
      );
  }, [inView]);

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        ref={ref}
        className="sectionTwoResponsive"
        sx={{ opacity: 0 }}
      >
        <Box
          sx={{ textAlign: "center" }}
          display="flex"
          justifyContent="center"
        >
          <Image
            src="https://res.cloudinary.com/dcvieavco/image/upload/v1678771084/AnyConv.com__D_NQ_NP_984611-MLA31466353739_072019-O_plmihi.jpg"
            width={250}
            height={250}
            alt="asd"
          />
        </Box>
        <div
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
            Equipamiento de Última Generación
          </Typography>
          <Typography sx={{ mt: 1, width: "80%" }} variant="body1">
            Descubre nuestra variedad de equipos de vanguardia para
            entrenamiento funcional, cardio y fuerza. Confía en la calidad y el
            respaldo de OnFit para disfrutar de una experiencia de gimnasio
            excepcional.
          </Typography>
          <Box sx={{ mt: 5 }} justifyContent="center">
            <Button
              color="secondary"
              size="large"
              onClick={() => router.push("/equipamiento")}
            >
              Explora nuestro catálogo
            </Button>
          </Box>
        </div>
      </Box>
    </>
  );
};
