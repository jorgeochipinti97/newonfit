import React from "react";
import Lottie from "lottie-react";
import computer from "../../animations/lf20_ndp2v5ri.json";
import email from "../../animations/lf20_sat0coot.json";
import instagram from "../../animations/lf20_vnqzcze6.json";
import error from "../../animations/lf20_qpwbiyxf.json";
import whatsapp from "../../animations/lf20_lfauq3rq.json";
import { Box, Divider, Typography } from "@mui/material";

export const FooterComponent = ({ isMobile }) => {
  return (
    <>
      <Box sx={{ width: "100%", my: 4 }}>
        <Divider sc={{ my: 1 }} />
        <Box sx={{ width: "100%" }} display={"flex"} justifyContent={"center"}>
          <Box
            sx={{ width: isMobile ? "20%" : "5%", cursor: "pointer" }}
            display={"flex"}
          >
            <Lottie animationData={instagram} loop={true} />
          </Box>
          <Box
            sx={{ width: isMobile ? "18%" : "3.5%", cursor: "pointer" }}
            display={"flex"}
          >
            <Lottie animationData={email} loop={true} />
          </Box>
          <Box
            sx={{ width: isMobile ? "20%" : "5%", cursor: "pointer" }}
            display={"flex"}
          >
            <Lottie animationData={whatsapp} loop={true} />
          </Box>
        </Box>

        {/* <Box
          sx={{ width: "100%", mt: 6 }}
          display={"flex"}
          justifyContent={"center"}
        >
          <Box
            sx={{ width: isMobile ? "30%" : "15%" }}
            display={"flex"}
            justifyContent={"center"}
          >
            <Lottie animationData={computer} loop={true} />
          </Box>
        </Box>

        <Typography
          varaint="subtitle1"
          sx={{ textAlign: "center", fontWeight: 800 }}
        >
          Developmnet by Royer Store
        </Typography> */}
      </Box>
    </>
  );
};
