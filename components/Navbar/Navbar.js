import React, { useContext, useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  useTheme,
  useMediaQuery,
  Box,
  Typography,
  IconButton,
  Badge,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { ShoppingCartOutlined } from "@mui/icons-material";
import { CartContext } from "@/context/cart/CartContext";

export const Navbar = ({ isMobile }) => {
  const theme = useTheme();
  const isXlUp = useMediaQuery(theme.breakpoints.up("xl"));
  const [menuBackdropStyle, setMenuBackdropStyle] = useState({});
  const { numberOfItems } = useContext(CartContext);

  const handleMouseEnter = (event) => {
    const { left, top, width, height } =
      event.currentTarget.getBoundingClientRect();
    setMenuBackdropStyle({
      left: `${left}px`,
      top: `${top}px`,
      width: `${width}px`,
      height: `${height}px`,
      opacity: 1,
      visibility: "visible",
    });
  };
  const { asPath, push } = useRouter();

  const handleMouseLeave = () => {
    setMenuBackdropStyle((prevState) => ({
      ...prevState,
      opacity: 0,
      visibility: "hidden",
    }));
  };
  const sections = [
    "Indumentaria",
    // "Suplementos",
    // "Equipamiento",
    // "Accesorios",
    "FAQS",
  ];
  return (
    <AppBar
      position="fixed"
      color="transparent"
      sx={{
        zIndex: theme.zIndex.drawer + 1,
        display: "flex",
        background: "rgba(0,0,0,0.8)",
        backdropFilter: "blur(4px)",
      }}
    >
      <Toolbar
        sx={{
          textDecoration: "none",
          overflow: "hidden",
          backgroundColor: "rgba(0,0,0,0.1)",
          display: "flex",
          justifyContent: "auto",
        }}
      >
        <div
          style={{ display: "flex", position: "fixed" }}
          onClick={() => push(`/`)}
        >
          <Image src="/logo.png" width={125} height={125} alt="" />
        </div>

        <Box flex={1} />
        <Box sx={{ display: "flex", display: isMobile ? "none" : "flex" }}>
          <Box
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => push(`/`)}
            sx={{
              px: 1,
              borderRadius: "30px",
              borderBottom:
                asPath == "/" ? "1px solid rgb(254, 221, 45)" : "transparent",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                mx: 1,
                fontSize: "16px",
                color: "white",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Inicio
            </Typography>
          </Box>
          {sections.map((e) => (
            <Box
              key={e}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={() => push(`/${e.toLowerCase()}`)}
              sx={{
                px: 1,
                borderRadius: "150px",

                borderBottom: asPath.includes(e.toLowerCase())
                  ? "1px solid rgb(254, 221, 45)"
                  : "transparent",
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  mx: 1,
                  fontSize: "16px",
                  color: "white",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                {e}
              </Typography>
            </Box>
          ))}
        </Box>

        <Box flex={1} />
        {isMobile ? (
          <IconButton sx={{ mx: 1 }} onClick={() => push("/cart")}>
            <Badge
              badgeContent={numberOfItems > 9 ? "+9" : numberOfItems}
              color="info"
              sx={{
                "& .MuiBadge-badge": {
                  fontWeight: "bold", // Cambia 'bold' por el grosor de fuente que prefieras
                  // Puedes agregar más estilos personalizados aquí
                },
                padding: 1,
                borderRadius: "90px",
                backgroundColor: "rgba(0,0,0,0.4)",
              }}
            >
              <ShoppingCartOutlined sx={{ color: "rgb(254, 221, 45)" }} />
            </Badge>
          </IconButton>
        ) : (
          <>
            <IconButton sx={{ mx: 1 }} onClick={() => push("/cart")}>
              <Badge
                badgeContent={numberOfItems > 9 ? "+9" : numberOfItems}
                color="info"
                sx={{
                  "& .MuiBadge-badge": {
                    fontWeight: "bold", // Cambia 'bold' por el grosor de fuente que prefieras
                    // Puedes agregar más estilos personalizados aquí
                  },
                  padding: 1,
                  borderRadius: "90px",
                  backgroundColor: "rgba(0,0,0,0.4)",
                }}
              >
                <ShoppingCartOutlined sx={{ color: "rgb(254, 221, 45)" }} />
              </Badge>
            </IconButton>
          </>
        )}
      </Toolbar>

      <div
        style={{
          position: "absolute",
          backgroundColor: "rgba(254, 221, 45,0.7)",
          backdropFilter: "blur(10px)",
          borderRadius: "10px",
          transform: `translateX(${menuBackdropStyle.left}) translateY(${menuBackdropStyle.top})`,
          width: menuBackdropStyle.width,
          height: menuBackdropStyle.height,
          transition: "all 0.5s ease-in-out",
          opacity: menuBackdropStyle.opacity,
          visibility: menuBackdropStyle.visibility,
          zIndex: -10,
        }}
      />
    </AppBar>
  );
};
