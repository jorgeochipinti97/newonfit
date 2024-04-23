import { FC, useMemo, useState, useEffect } from "react";
import NextLink from "next/link";
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  Box,
  Typography,
  Link,
  Divider,
  Button,
  capitalize,
} from "@mui/material";

import Image from "next/image";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import { Elastic, gsap, Power4, Power1, Back } from "gsap";

import { useRouter } from "next/router";

import { useInView } from "react-intersection-observer";

export const ProductCard = ({ product, isMobile }) => {
  const formattwo = (value) => {
    // Crear formateador
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

    return formatter.format(value); //$2,500.00
  };

  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  gsap.registerPlugin(ScrollTrigger);

  const { ref, inView, entry } = useInView({
    threshold: 0.4,
    triggerOnce: true,
  });

  const productImage = useMemo(() => {
    try {
      if (product.images.length <= 1) {
        return product.images[0]; // O cualquier otro valor o acción que desees realizar
      }

      return isHovered ? product.images[1] : product.images[0];
    } catch (err) {
      console.log(err);
    }
  }, [isHovered, product.images]);

  useEffect(() => {
    inView &&
      gsap.to(`.productCard${product.slug}`, {
        // transform: "rotateY(0deg)",
        opacity: 1,
      });
  }, [inView]);
  return (
    <Grid
      item
      xs={12}
      sm={4}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      ref={ref}
      className={`productCard${product.slug}`}
      sx={{
        cursor: "pointer",
        overflow: "hidden",
        // transformStyle: "preserve-3d",
        // transform: "rotateY(180deg)",
        opacity: 0,
        display: "flex",
        justifyContent: "start",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        onClick={() => router.push(`/products/${product.slug}`)}
        sx={{
          overflow: "hidden",

          width: "80%",
        }}
      >
        <Card sx={{}}>
          <CardActionArea sx={{}}>
            <Link>
              <Box
                display="flex"
                justifyContent="center"
                sx={{ overflow: "hidden" }}
              >
                <CardMedia
                  component="div"
                  className="fadeIn"
                  sx={{ overflow: "hidden", aspectRatio: "9/13" }}
                >
                  <img
                    alt={product.titulo}
                    src={productImage || ""}
                    style={{ width: "100%" }}
                  />
                </CardMedia>
              </Box>
            </Link>
          </CardActionArea>
        </Card>
      </Box>
      <Box
        onClick={() => router.push(`/products/${product.slug}`)}
        sx={{
          width: "80%",
          py: 1,
          borderRadius: "0px 0px 10px 10px",

          backdropFilter: "blur(4px)",
          backgroundColor: "black",
          position: "relative",
          bottom: 10,
          display: "flex",

          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            color: "rgb(254, 221, 45)",

            fontWeight: 800,
            backdropFilter: "blur(2px)",
            fontSize: "15px",
            backgroundColor: "black",
            borderRadius: "9px",
            padding: 5,
          }}
        >
          {product.titulo}
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-around",
            marginTop: "15px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "end",
              my: 1,
            }}
          >
            {product.precioDescuento > 0 ? (
              // Si hay un precio de descuento, muestra ambos precios
              <>
                <Typography
                  variant="button"
                  sx={{
                    textDecoration: "line-through",
                    fontWeight: 800,
                    fontSize: "15px",
                    color: "#ef4444",
                    borderRadius: "19px",
                    mx: 1,
                  }}
                >
                  {formattwo(product.precio)}
                </Typography>
                <Typography
                  variant="button"
                  sx={{
                    fontWeight: 800,
                    fontSize: "15px",
                    mx: 1,
                    borderRadius: "19px",
                    color: "#f5f5f7",
                  }}
                >
                  {formattwo(product.precioDescuento)}
                </Typography>
              </>
            ) : (
              // Si no hay precio de descuento, muestra solo el precio original
              <Typography
                variant="button"
                sx={{
                  fontWeight: 800,
                  fontSize: "15px",
                  px: 2,
                  py: 1,
                  mx: 2,
                  borderRadius: "19px",
                  color: "#f5f5f7",
                }}
              >
                {formattwo(product.precio)}
              </Typography>
            )}{" "}
          </Box>
          <div style={{ display:'flex', alignItems:'center'}}>
            <Button
              sx={{ fontSize: "15px" }}
              startIcon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  viewBox="0 0 24 24"
                >
                  <title>shopping</title>
                  <path d="M12,13A5,5 0 0,1 7,8H9A3,3 0 0,0 12,11A3,3 0 0,0 15,8H17A5,5 0 0,1 12,13M12,3A3,3 0 0,1 15,6H9A3,3 0 0,1 12,3M19,6H17A5,5 0 0,0 12,1A5,5 0 0,0 7,6H5C3.89,6 3,6.89 3,8V20A2,2 0 0,0 5,22H19A2,2 0 0,0 21,20V8C21,6.89 20.1,6 19,6Z" />
                </svg>
              }
            >
              Comprar ahora
            </Button>
          </div>
        </div>
      </Box>
    </Grid>
  );
};
