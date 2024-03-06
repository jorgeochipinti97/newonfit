import { Box, Grid, Button, Typography } from "@mui/material";
import Image from "next/image";
import React, { useEffect } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import { useInView } from "react-intersection-observer";

import { Elastic, gsap, Power4, Power1, Back } from "gsap";
import { useRouter } from "next/router";
export const SectionThreeResponsive = () => {
  const router = useRouter();
  gsap.registerPlugin(ScrollTrigger);

  const { ref, inView, entry } = useInView({
    threshold: 0.9,
    triggerOnce: true,
  });

  useEffect(() => {
    inView && gsap.to(".sectionThreeResponsive", { transform: "scale(1)", opacity: 1 });
  }, [inView]);

  return (
    <>
      <Box
        display={"flex"}
        flexDirection={"column"}
        ref={ref}
        className='sectionThreeResponsive'
        sx={{ transform: "scale(0)", opacity: 0 }}
      >
        <div>
          <Box
            sx={{ textAlign: "center" }}
            display="flex"
            justifyContent="center"
          >
            <Image
              src="https://res.cloudinary.com/dcvieavco/image/upload/v1678770982/stainless-steel-water-bottle-black-17oz-front-640d672f77c6b_gxmaz7.jpg"
              width={250}
              height={250}
              alt="asd"
            />
          </Box>
        </div>
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
      </Box>
    </>
  );
};
