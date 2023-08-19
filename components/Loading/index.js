import { Box } from "@mui/material";
import React from "react";
import Lottie from "lottie-react";
import groovyWalkAnimation from "../../animations/lf20_ZyCSQa.json";


export const LoadingComponent = () => {
  return (
    <>

      <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mt:15 }}>
        <Box sx={{ width: "50%" }}>
          <Lottie animationData={groovyWalkAnimation} loop={true} />;
        </Box>
      </Box>
    </>
  );
};
