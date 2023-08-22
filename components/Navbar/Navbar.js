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
  } from "@mui/material";import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import {
    ClearOutlined,
    SearchOutlined,
    ShoppingCartOutlined,
  } from "@mui/icons-material";

  import ManIcon from '@mui/icons-material/Man';
import { UiContext } from "@/context/ui/UiContext";
import { CartContext } from "@/context/cart/CartContext";
export const Navbar = ({isMobile}) => {
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

    <AppBar sx={{ textDecoration: "none", overflow: "hidden" }}>
      <Toolbar sx={{ textDecoration: "none", overflow: "hidden" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Box sx={{ mt: 2, mb: 2, transform: isMobile ? "scale(0.7)" : "" }}>
            {/* <Typography variant="h6">Onfit |</Typography> */}
            <Image src="/logo.png" width={125} height={125} alt="" />
          </Box>
          <Box
            sx={{
              display: { xs: "none", sm: "block" },
            }}
            className="fadeIn"
            alignSelf="center"
          >
            <NextLink href="/" passHref>
              <Button
                sx={{ textDecoration: "none" }}
                color={asPath === "/" ? "secondary" : "info"}
              >
                Inicio
              </Button>
            </NextLink>
            <NextLink href="/hombres" passHref>
              <Button color={asPath === "/hombres" ? "secondary" : "info"}>
                Hombres
              </Button>
            </NextLink>
            <NextLink href="/mujeres" passHref>
              <Button color={asPath === "/mujeres" ? "secondary" : "info"}>
                Mujeres
              </Button>
            </NextLink>
            <NextLink href="/suplementos" passHref>
              <Button color={asPath === "/suplementos" ? "secondary" : "info"}>
                Suplementos
              </Button>
            </NextLink>
            <NextLink href="/equipamiento" passHref>
              <Button color={asPath === "/equipamiento" ? "secondary" : "info"}>
                Equipamiento
              </Button>
            </NextLink>
            <NextLink href="/accesorios" passHref>
              <Button color={asPath === "/accesorios" ? "secondary" : "info"}>
                Accesorios
              </Button>
            </NextLink>
            <NextLink href="/faqs" passHref>
              <Button color={asPath === "/faqs" ? "secondary" : "info"}>
                FAQS
              </Button>
            </NextLink>
          </Box>

          {/* Pantallas pantallas grandes */}
          <Box display="flex">
            {isSearchVisible ? (
              <Input
                sx={{ display: { xs: "none", sm: "flex" } }}
                className="fadeIn"
                autoFocus
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => (e.key === "Enter" ? onSearchTerm() : null)}
                type="text"
                placeholder="Buscar..."
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={() => setIsSearchVisible(false)}>
                      <ClearOutlined />
                    </IconButton>
                  </InputAdornment>
                }
              />
            ) : (
              <IconButton
                onClick={() => setIsSearchVisible(true)}
                className="fadeIn"
                sx={{ display: { xs: "none", sm: "flex" } }}
              >
                <SearchOutlined />
              </IconButton>
            )}

            <IconButton onClick={() => push("/cart")}>
              <Badge
                badgeContent={numberOfItems > 9 ? "+9" : numberOfItems}
                color="secondary"
                sx={{fontWeight:'800'}}
              >
                <ShoppingCartOutlined />
              </Badge>
            </IconButton>
            <Button
              onClick={toggleSideMenu}
              sx={{ display: { xs: "block", sm: "block", md: "none" } }}
            >
              Menu
            </Button>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
