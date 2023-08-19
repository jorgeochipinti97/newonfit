import { Box, Grid, Button, Typography } from "@mui/material";
import Image from "next/image";
import React, { useEffect } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import { useInView } from "react-intersection-observer";

import { Elastic, gsap, Power4, Power1, Back } from "gsap";
import { useRouter } from "next/router";

export const SectionTwoHome = () => {
  const router = useRouter()
  gsap.registerPlugin(ScrollTrigger);
  const { ref, inView, entry } = useInView({
    threshold: 0.9,
    triggerOnce: true,
  });

  useEffect(() => {
    inView &&
      gsap.fromTo(
        ".sectionTwo",
        { xPercent: 100 },
        { xPercent: 0, opacity: 1 }
      );
  }, [inView]);
  return (
    <>
      <Grid item sm={6} lg={6} xl={6} ref={ref}>
        <div
          className="sectionTwo"
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            opacity: 0,
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
      </Grid>
      <Grid item sm={6} lg={6} xl={6} ref={ref}>
        <div className="sectionTwo" style={{ opacity: 0 }}>
          <Box
            sx={{ textAlign: "center" }}
            display="flex"
            justifyContent="center"
          >
            <Image
              src="https://res.cloudinary.com/dcvieavco/image/upload/v1678771084/AnyConv.com__D_NQ_NP_984611-MLA31466353739_072019-O_plmihi.jpg"
              width={500}
              height={500}
              alt="asd"
            />
          </Box>
        </div>
      </Grid>
    </>
  );
};
