import { Box } from "@mui/material";
import React, { useEffect } from "react";
import Lottie from "lottie-react";
import groovyWalkAnimation from "../../animations/lf20_ZyCSQa.json";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import { Elastic, gsap, Power4, Power1, Back } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export const LoadingComponent = () => {
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    gsap.to(".loader", { opacity: 0, delay: .5 });
    gsap.to(".loader", { display: "none", delay: 1.8 });
  }, []);

  return (
    <>
      <Box
        className="loader"
        sx={{ position: "fixed", zIndex: "100", backgroundColor: "white" }}
      >
        <Box
          sx={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            mt: 15,
          }}
        >
          <Box sx={{ width:{xs:'80%',sm:'80%',md:'20%',lg:'20%',xl:'20%'}  }} className='loader'>
            <Lottie animationData={groovyWalkAnimation} loop={true} />;
            <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
              <LinearProgress color="secondary" />
              <LinearProgress color="primary" />
              <LinearProgress color="secondary" />
            </Stack>
          </Box>
        </Box>
      </Box>
    </>
  );
};
