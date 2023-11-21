import { Box, Grid, Button, Typography } from "@mui/material";
import Image from "next/image";
import React, { useEffect } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import { useInView } from "react-intersection-observer";

import { Elastic, gsap, Power4, Power1, Back } from "gsap";
import { useRouter } from "next/router";

export const SectionThreeHome = ({isMobile}) => {
  const router = useRouter();
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
        <Grid
        item
        sm={12}
        lg={12}
        xl={12}
        sx={{
          scrollSnapAlign: "start",
          scrollMarginTop: "20px",

          display: "flex",
          justifyContent:'center', 

        }}
      >
                <Box className="modern-gradient"  sx={{py: isMobile ? 2 :0}} style={{width: isMobile? '98%':"80%", display:'flex',    borderRadius: isMobile ? "10px" :'90px', backgroundImage: isMobile ?"linear-gradient(to bottom, rgba(0,0,0,.3) 40%, black),linear-gradient(to bottom,rgba(0,0,0,0.8),rgba(0, 0, 0, 0.5)), url(https://res.cloudinary.com/dcvieavco/image/upload/v1678771074/AnyConv.com__colageno_ex4c02.jpg)": 'none',backgroundSize:'cover'

}}>
    
          <div
            ref={ref}
            className="sectionOne"
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
            <Typography sx={{ mt: 1, width: "80%",color:'rgb(254, 221, 45)',fontWeight:'800',lineHeight: "25px" }}              variant="h5"
>
            Suplementos de Calidad para Potenciar Tu Entrenamiento
            </Typography>
            <Typography               sx={{ mt: 1, width: "80%", color: "black",fontSize:'16px',color:'#f5f5f7',display:isMobile ?'none':'auto' }}
 variant="body1">
            Descubre nuestra selección de suplementos de alta calidad diseñados
            para optimizar tu rendimiento y maximizar los resultados de tu
            entrenamiento. Te ofrecemos una amplia gama de suplementos
            esenciales, desde proteínas hasta pre-work y más, para ayudarte a
            alcanzar tus metas fitness de manera efectiva.{" "}
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Button

size={isMobile? "small":'large'}
                onClick={() => router.push("/suplementos")}
              >
                ¡Potenciarme ahora!
              </Button>
            </Box>
          </div>
          <Box
            ref={ref}
            id="sectionOne"
            className="sectionOne"
            sx={{ textAlign: "center", }}
            display="flex"
            justifyContent="center"
          >
            <Image
              src="https://res.cloudinary.com/dcvieavco/image/upload/v1678771074/AnyConv.com__colageno_ex4c02.jpg"
              width={400}
              height={400}
              style={{ borderRadius: "80px", backgroundColor: "#f5f5f7",display:isMobile?'none':'auto' }}
              alt="asd"
            />
          </Box>
        </Box>
      </Grid>

    </>
  );
};
