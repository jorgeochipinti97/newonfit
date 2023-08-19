import { Box, Grid, Button, Typography } from "@mui/material";
import Image from "next/image";
import React, { useEffect } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import { useInView } from "react-intersection-observer";

import { Elastic, gsap, Power4, Power1, Back } from "gsap";
import { useRouter } from "next/router";

export const SectionThreeHome = () => {
  const router = useRouter()
  gsap.registerPlugin(ScrollTrigger);

  const { ref, inView, entry } = useInView({
    threshold: 0.9,
    triggerOnce: true,
  });

  useEffect(() => {
    inView && gsap.to(".sectionThree", { transform: "scale(1)" });
  }, [inView]);

  return (
    <>
      <Grid item sm={6} lg={6} xl={6} ref={ref}>
        <div >
          <Box
         className="sectionThree" sx={{ transform: "scale(0)",textAlign:'center' }}
            display="flex"
            justifyContent="center"
          >
            <Image
              src="https://res.cloudinary.com/dcvieavco/image/upload/v1678770982/stainless-steel-water-bottle-black-17oz-front-640d672f77c6b_gxmaz7.jpg"
              width={500}
              height={500}
              alt="asd"
            />
          </Box>
        </div>
      </Grid>
      <Grid item sm={6} lg={6} xl={6} ref={ref}>
        <div
          className="sectionThree"
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            textAlign: "center",
            transform: "scale(0)",
          }}
        >
          <Typography sx={{ mt: 1, width: "80%" }} variant="subtitle1">
            Accesorios de Alto Rendimiento para Potenciar Tu Entrenamiento
          </Typography>
          <Typography sx={{ mt: 1, width: "80%" }} variant="body1">
            Descubre nuestra amplia gama de accesorios de alta calidad que
            complementarán y potenciarán tu rutina de ejercicios. En OnFit, la
            cadena de gimnasios líder en Buenos Aires, te ofrecemos una cuidada
            selección de accesorios diseñados para ayudarte a alcanzar tus metas
            de acondicionamiento físico de manera efectiva y cómoda.
          </Typography>
          <Box sx={{ mt: 5 }}>
            <Button
              color="secondary"
              size="large"
              onClick={() => router.push("/accesorios")}
            >
              Descubre nuestros accesorios
            </Button>
          </Box>
        </div>
      </Grid>
    </>
  );
};
