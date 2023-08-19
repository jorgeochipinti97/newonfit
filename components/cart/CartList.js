import { FC, useContext } from "react";
import NextLink from "next/link";
import {
  Box,
  Button,
  CardActionArea,
  CardMedia,
  Grid,
  Link,
  Typography,
  capitalize,
} from "@mui/material";

import { ItemCounter } from "../ItemCounter";
import { CartContext } from "@/context/cart/CartContext";

export const CartList = ({ editable = false, products, isMobile }) => {
  const { cart, updateCartQuantity, removeCartProduct } =
    useContext(CartContext);

  const onNewCartQuantityValue = (product, newQuantityValue) => {
    product.quantity = newQuantityValue;
    updateCartQuantity(product);
  };

  const productsToShow = products ? products : cart;

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
  return (
    <>
      {productsToShow &&
        productsToShow.map((product) => (
          <Grid
            container
            spacing={2}
            key={product.slug + product.size}
            sx={{ mb: 1 }}
          >
            <Grid item xs={3}>
              <NextLink href={`/product/${product.slug}`} passHref>
                <Link>
                  <CardActionArea>
                    <CardMedia
                      image={product.image}
                      component="img"
                      sx={{ borderRadius: "5px" }}
                    />
                  </CardActionArea>
                </Link>
              </NextLink>
            </Grid>
            <Grid item xs={6}>
              <Box display="flex" flexDirection="column">
                <Typography variant="body1">
                  {capitalize(product.title)}
                </Typography>
                {product.type == "hombre" ||
                  (product.type == "mujer" && (
                    <Typography variant="body1">
                      Size: <strong>{product.size}</strong>
                    </Typography>
                  ))}

                {editable ? (
                  <ItemCounter
                    currentValue={product.quantity}
                    maxValue={10}
                    updatedQuantity={(value) =>
                      onNewCartQuantityValue(product, value)
                    }
                  />
                ) : (
                  <Typography variant="h5">
                    {product.quantity}{" "}
                    {product.quantity > 1 ? "productos" : "producto"}
                  </Typography>
                )}
              </Box>
            </Grid>
            <Grid
              item
              xs={2}
              display="flex"
              alignItems="center"
              flexDirection="column"
              sx={{}}
            >
              <Typography variant="subtitle1">
                {formattwo(product.price)}
              </Typography>

              {editable && (
                <Button
                  sx={{ transform: isMobile ? "scale(0.8)" : "auto" }}
                  variant="outlined"
                  color="error"
                  onClick={() => {removeCartProduct(product)}}
                >
                  Remover
                </Button>
              )}
            </Grid>
          </Grid>
        ))}
    </>
  );
};
