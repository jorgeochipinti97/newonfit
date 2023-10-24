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
    threshold: 0.9,
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

  const handlePrice = (precio, descuento) => {
    const porcentajePrecioConDescuento = 100 - descuento;
    const precioConDescuento = (precio * porcentajePrecioConDescuento) / 100;

    return precioConDescuento;
  };
  useEffect(() => {
    inView &&
      gsap.to(`.productCard${product.slug}`, {
        transform: "rotateY(0deg)",
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
        transformStyle: "preserve-3d",
        transform: "rotateY(180deg)",
        opacity: 0,
        borderRadius: "90px",
      }}
    >
      <Box
        data-aos="flip-left"
        onClick={() => router.push(`/products/${product.slug}`)}
        sx={{ overflow: "hidden", transform: isMobile ? "scale(0.8)" : "" }}
      >
        <Box sx={{ m: 1, overflow: "hidden" }}>
          <Card sx={{ backgroundColor: "transparent" }}>
            <CardActionArea sx={{ borderRadius: "90px" , background:'linear-gradient(190deg, rgba(235,235,100,.1) , rgba(235,235,100,.1))'}}>
              <Link>
                <Box
                  display="flex"
                  justifyContent="center"
                  sx={{ overflow: "hidden" }}
                >
                  <CardMedia
                    component="div"
                    className="fadeIn"
                    sx={{ overflow: "hidden", borderRadius: "90px" }}
                  >
                    <Image
                      width={400}
                      height={400}
                      loading="lazy"
                      alt={product.titulo}
                      src={productImage || ""}
                      style={{ width:'100%' }}
                    />
                  </CardMedia>
                </Box>
              </Link>

              <Box
                sx={{
                  // display: isImageLoaded ? "block" : "none",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Box
                  display="flex"
                  justifyContent="center"
                  sx={{ overflow: "hidden" }}
                >
                  <Typography
                    variant="subtitle1"
                    textAlign={"center"}
                    fontWeight={700}
                    color="primary"
                    sx={{}}
                  >
                    {capitalize(`${product.titulo}`)}
                  </Typography>
                </Box>
                <Box sx={{ overflow: "hidden" }}>
                  <Box
                    display="flex"
                    justifyContent="center"
                    sx={{ mb: 1, mt: 2, overflow: "hidden" }}
                  >
                    <Link sx={{ overflow: "hidden" }}>
                      <Button color="primary" sx={{ width: "130px" }}>
                        <Typography
                          variant="body2"
                          textAlign={"center"}
                          fontWeight={700}
                        >
                          {formattwo(product.precio)}
                        </Typography>
                      </Button>
                    </Link>
                  </Box>{" "}
                </Box>
              </Box>
            </CardActionArea>
          </Card>
        </Box>
        <Divider sx={{ my: 2 }} />
      </Box>
    </Grid>
  );
};
