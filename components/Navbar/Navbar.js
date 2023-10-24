import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Input,
  InputAdornment,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import {
  ClearOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";

import ManIcon from "@mui/icons-material/Man";
import { UiContext } from "@/context/ui/UiContext";
import { CartContext } from "@/context/cart/CartContext";
export const Navbar = ({ isMobile }) => {
  const { asPath, push } = useRouter();
  const { toggleSideMenu } = useContext(UiContext);
  const { numberOfItems } = useContext(CartContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return;
    push(`/search/${searchTerm}`);
  };

  // useEffect(() => {
  //   console.log(numberOfItems);
  // }, []);

  return (
    <AppBar
      sx={{
        textDecoration: "none",
        overflow: "hidden",
        backgroundColor: "transparent",
        display: "flex",
        justifyContent: "center",
        backdropFilter:'hue-rotate(120deg) blur(1px)'
      }}
    >
      <Toolbar
        sx={{
          textDecoration: "none",
          overflow: "hidden",
          backgroundColor: "rgba(0,0,0,0.1)",
          display:'flex', justifyContent:'auto'
        }}
      >

<Box sx={{ display: isMobile ? "none" : "auto", px:2,borderRadius:'10px' }}>
            <Image src="/logo.png" width={125} height={125} alt="" />
          </Box>
<Box flex={1}/>



    

          <Box sx={{display:{xs:'none', sm:'block'}}} className="fadeIn" alignSelf="center" justifySelf={'center'} >
            <NextLink href="/" passHref>
              <Button
                sx={{ textDecoration: "none" }}
                color={asPath === "/" ? "secondary" : "info"}
              >
                Inicio
              </Button>
            </NextLink>
            <NextLink href="/indumentaria" passHref>
              <Button
                sx={{ mx: 1 }}
                color={asPath === "/indumentaria" ? "secondary" : "info"}
              >
                Indumentaria
              </Button>
            </NextLink>
            {/* <NextLink href="/mujeres" passHref>
              <Button
                sx={{ mx: 1 }}
                color={asPath === "/mujeres" ? "secondary" : "info"}
              >
                Mujeres
              </Button>
            </NextLink> */}
            <NextLink href="/suplementos" passHref>
              <Button
                sx={{ mx: 1 }}
                color={asPath === "/suplementos" ? "secondary" : "info"}
              >
                Suplementos
              </Button>
            </NextLink>
            <NextLink href="/equipamiento" passHref>
              <Button
                sx={{ mx: 1 }}
                color={asPath === "/equipamiento" ? "secondary" : "info"}
              >
                Equipamiento
              </Button>
            </NextLink>
            <NextLink href="/accesorios" passHref>
              <Button
                sx={{ mx: 1 }}
                color={asPath === "/accesorios" ? "secondary" : "info"}
              >
                Accesorios
              </Button>
            </NextLink>
            <NextLink href="/faqs" passHref>
              <Button
                sx={{ mx: 1 }}
                color={asPath === "/faqs" ? "secondary" : "info"}
              >
                FAQS
              </Button>
            </NextLink>
          </Box>
          <Box flex={1}/>
          <IconButton sx={{ mx: 1 }} onClick={() => push("/cart")}>
            <Badge
              badgeContent={numberOfItems > 9 ? "+9" : numberOfItems}
              color="secondary"
              sx={{
                backgroundColor: "rgba(0,0,0,0.4)",
                p: 1,
                borderRadius: "90px",
              }}
            >
              <ShoppingCartOutlined sx={{ color: "white" }} />
            </Badge>
          </IconButton>
          <Button
          onClick={toggleSideMenu}
          sx={{
            display: { xs: "block", sm: "block", md: "none" },
            backgroundColor: "transparent",
          }}
        >
          <span
            style={{
              backgroundColor: "black",
              color: "white",
              padding: 4,
              borderRadius: "90px",
            }}
          >
            Menu
          </span>
        </Button>
      </Toolbar>
    </AppBar>
  );
};
