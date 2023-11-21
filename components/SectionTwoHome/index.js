import { Box, Grid, Button, Typography } from "@mui/material";
import Image from "next/image";
import React, { useEffect } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import { useInView } from "react-intersection-observer";

import { Elastic, gsap, Power4, Power1, Back } from "gsap";
import { useRouter } from "next/router";

export const SectionTwoHome = ({isMobile}) => {
  const router = useRouter();
  gsap.registerPlugin(ScrollTrigger);
  const { ref, inView, entry } = useInView({
    threshold: 0.9,
    triggerOnce: true,
  });

  useEffect(() => {
    inView && gsap.fromTo(".sectionTwo", { xPercent: 100 }, { xPercent: 0 });
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
mx:1,
          display: "flex",
          justifyContent: "center",my:isMobile ? 1:5
        }}
      >
        <div
          style={{
            width: isMobile ? '100%': "80%",
            display: "flex",
            borderRadius: "90px",
            justifyContent:'space-between'
          }}
          
        >
          <div
 className="modern-gradient"
            style={{
              width: "48%",
              display: "flex",
              borderRadius: isMobile?'10px':"90px",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "black",
              marginRight: "2px",
              height:isMobile ? '48vw':'600px',
              backgroundImage:"linear-gradient(to bottom, rgba(0,0,0,.3) 40%, black),linear-gradient(to bottom,rgba(0,0,0,0.8),rgba(0, 0, 0, 0.5)),url('https://res.cloudinary.com/dcvieavco/image/upload/v1678771084/AnyConv.com__D_NQ_NP_984611-MLA31466353739_072019-O_plmihi.jpg')",backgroundSize:'cover'
            }}
          >

            <div
              className="sectionTwo"
              style={{
                width: "75%",
                display: "flex",
                flexDirection: "column",

                justifyContent: "start",
                alignItems: "center",

                textAlign: "center",
              }}
            >
              <Typography
                sx={{ mt: 1, width: "90%", color: "#f5f5f7",fontWeight:'800',fontSize:isMobile?'15px':'auto' }}
                variant="h4"
              >
                Equipamiento de Última Generación
              </Typography>
              <Typography
                sx={{ mt: 1, width: "80%", color: "#f5f5f7" ,fontWeight:'500',display:isMobile? "none":'auto'}}
                variant="body1"
              >
                Descubre nuestra variedad de equipos de vanguardia para
                entrenamiento funcional, cardio y fuerza. Confía en la calidad y
                el respaldo de OnFit para disfrutar de una experiencia de
                gimnasio excepcional.
              </Typography>
              <Box sx={{ my: 2 }} justifyContent="center">
                <Button
                  color="secondary"
                  size={isMobile ? 'small':"large"}
                  onClick={() => router.push("/equipamiento")}
                >
                  Explora más
                </Button>
              </Box>
            </div>
          </div>
          <div
 className="modern-gradient"
            style={{
              width: "48%",
              display: "flex",
              borderRadius: isMobile?'10px' :"90px",

              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundImage:"linear-gradient(to bottom, rgba(0,0,0,.3) 40%, black),linear-gradient(to bottom,rgba(0,0,0,0.8),rgba(0, 0, 0, 0.5)),url('https://res.cloudinary.com/dcvieavco/image/upload/v1678770982/stainless-steel-water-bottle-black-17oz-front-640d672f77c6b_gxmaz7.jpg')",backgroundSize:'cover'

            }}
          >

            <div
              className="sectionTwo"
              style={{

                display: "flex",
                flexDirection: "column",

                justifyContent: "center",
                alignItems: "center",

                textAlign: "center",
              }}
            >
             <Typography
                sx={{ mt: 1, width: "100%", color: "#f5f5f7",fontWeight:'800', fontSize:isMobile?'15px':'auto' }}
                variant="h4"
              >
                Accesorios de Alto Rendimiento 
              </Typography>
              <Typography
                sx={{ mt: 1, width: "80%", color: "#f5f5f7" ,display:isMobile?'none':'auto'}}
                variant="body1"
              >
                Explora en OnFit, líder en Buenos Aires, accesorios de alta
                calidad para mejorar tu rutina de ejercicios y alcanzar tus
                metas de forma efectiva y cómoda.
              </Typography>
              <Box sx={{ my: 2 }} justifyContent="center">
                <Button
                  color="secondary"
                  size={isMobile ? 'small':"large"}
                  onClick={() => router.push("/accesorios")}
                >
                  Descubre más
                </Button>
              </Box>
            </div>
          </div>
        </div>
      </Grid>
    </>
  );
};
