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
import {
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { CartContext } from "@/context/cart/CartContext";
export const Navbar = () => {
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
    "Suplementos",
    "Equipamiento",
    "Accesorios",
    "FAQS",
  ];
  return (
    <AppBar
      position="fixed"
      color="transparent"
      sx={{
        zIndex: theme.zIndex.drawer + 1,
        display: "flex",
        background: "rgba(0,0,0,0.9)",
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
        <div style={{  display: "flex" }}>
          <Image src="/logo.png" width={125} height={125} alt="" />
        </div>

        <Box flex={1} />
        <Box sx={{ display: "flex" }}>
          <Box
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => push(`/`)}
            sx={{
              px: 1,
              borderRadius: "90px",

              backgroundColor:
                asPath == "/" ? "rgb(254, 221, 45)" : "transparent",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                mx: 1,
                fontSize: "16px",
                color: asPath == "/" ? "black" : "white",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Inicio
            </Typography>
          </Box>
          {
            sections.map((e) => (
              <Box
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={() => push(`/${e.toLowerCase()}`)}
                sx={{
                  px: 1,
                  borderRadius: "90px",

                  backgroundColor: asPath.includes(e.toLowerCase())
                    ? "rgb(254, 221, 45)"
                    : "transparent",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    mx: 1,
                    fontSize: "16px",
                    color: asPath.includes(e.toLowerCase()) ? "black" : "white",
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
        <IconButton sx={{ mx: 1 }} onClick={() => push("/cart")}>
            <Badge
              badgeContent={numberOfItems > 9 ? "+9" : numberOfItems}
              color="secondary"
              sx={{
                '& .MuiBadge-badge': {
                  fontWeight: 'bold', // Cambia 'bold' por el grosor de fuente que prefieras
                  // Puedes agregar más estilos personalizados aquí
                },padding:1,borderRadius:'90px',
                backgroundColor: "rgba(0,0,0,0.4)",
              }}
            >
              <ShoppingCartOutlined sx={{ color: "white" }} />
            </Badge>
          </IconButton>
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

// import {
//   AppBar,
//   Badge,
//   Box,
//   Button,
//   IconButton,
//   Input,
//   InputAdornment,
//   Link,
//   Toolbar,
//   Typography,
// } from "@mui/material";
// import Image from "next/image";
// import NextLink from "next/link";
// import { useRouter } from "next/router";
// import React, { useContext, useState } from "react";
// import {
//   ClearOutlined,
//   SearchOutlined,
//   ShoppingCartOutlined,
// } from "@mui/icons-material";

// import ManIcon from "@mui/icons-material/Man";
// import { UiContext } from "@/context/ui/UiContext";
// import { CartContext } from "@/context/cart/CartContext";
// export const Navbar = ({ isMobile }) => {
//   const { asPath, push } = useRouter();
//   const { toggleSideMenu } = useContext(UiContext);
//   const { numberOfItems } = useContext(CartContext);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [isSearchVisible, setIsSearchVisible] = useState(false);

//   const onSearchTerm = () => {
//     if (searchTerm.trim().length === 0) return;
//     push(`/search/${searchTerm}`);
//   };

//   // useEffect(() => {
//   //   console.log(numberOfItems);
//   // }, []);

//   return (
//     <AppBar
//       sx={{
//         textDecoration: "none",
//         overflow: "hidden",
//         backgroundColor: "transparent",
//         display: "flex",
//         justifyContent: "center",
//         backdropFilter:' blur(1px)'
//       }}
//     >
//       <Toolbar
//         sx={{
//           textDecoration: "none",
//           overflow: "hidden",
//           backgroundColor: "rgba(0,0,0,0.1)",
//           display:'flex', justifyContent:'auto'
//         }}
//       >

// <Box sx={{ display: isMobile ? "none" : "auto", px:2,borderRadius:'10px' }}>
//             <Image src="/logo.png" width={125} height={125} alt="" />
//           </Box>
// <Box flex={1}/>

//           <Box sx={{display:{xs:'none', sm:'block'}}} className="fadeIn" alignSelf="center" justifySelf={'center'} >
//             <NextLink href="/" passHref>
//               <Button
//                 sx={{ textDecoration: "none" }}
//                 color={asPath === "/" ? "secondary" : "info"}
//               >
//                 Inicio
//               </Button>
//             </NextLink>
//             <NextLink href="/indumentaria" passHref>
//               <Button
//                 sx={{ mx: 1 }}
//                 color={asPath === "/indumentaria" ? "secondary" : "info"}
//               >
//                 Indumentaria
//               </Button>
//             </NextLink>
//             {/* <NextLink href="/mujeres" passHref>
//               <Button
//                 sx={{ mx: 1 }}
//                 color={asPath === "/mujeres" ? "secondary" : "info"}
//               >
//                 Mujeres
//               </Button>
//             </NextLink> */}
//             <NextLink href="/suplementos" passHref>
//               <Button
//                 sx={{ mx: 1 }}
//                 color={asPath === "/suplementos" ? "secondary" : "info"}
//               >
//                 Suplementos
//               </Button>
//             </NextLink>
//             <NextLink href="/equipamiento" passHref>
//               <Button
//                 sx={{ mx: 1 }}
//                 color={asPath === "/equipamiento" ? "secondary" : "info"}
//               >
//                 Equipamiento
//               </Button>
//             </NextLink>
//             <NextLink href="/accesorios" passHref>
//               <Button
//                 sx={{ mx: 1 }}
//                 color={asPath === "/accesorios" ? "secondary" : "info"}
//               >
//                 Accesorios
//               </Button>
//             </NextLink>
//             <NextLink href="/faqs" passHref>
//               <Button
//                 sx={{ mx: 1 }}
//                 color={asPath === "/faqs" ? "secondary" : "info"}
//               >
//                 FAQS
//               </Button>
//             </NextLink>
//           </Box>
//           <Box flex={1}/>
//           <IconButton sx={{ mx: 1 }} onClick={() => push("/cart")}>
//             <Badge
//               badgeContent={numberOfItems > 9 ? "+9" : numberOfItems}
//               color="secondary"
//               sx={{
//                 backgroundColor: "rgba(0,0,0,0.4)",
//                 p: 1,
//                 borderRadius: "90px",
//               }}
//             >
//               <ShoppingCartOutlined sx={{ color: "white" }} />
//             </Badge>
//           </IconButton>
//           <Button
//           onClick={toggleSideMenu}
//           sx={{
//             display: { xs: "block", sm: "block", md: "none" },
//             backgroundColor: "transparent",
//           }}
//         >
//           <span
//             style={{
//               backgroundColor: "black",
//               color: "white",
//               padding: 4,
//               borderRadius: "90px",
//             }}
//           >
//             Menu
//           </span>
//         </Button>
//       </Toolbar>
//     </AppBar>
//   );
// };
