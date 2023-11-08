import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import NextLink from "next/link";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import { useInView } from "react-intersection-observer";

import { Elastic, gsap, Power4, Power1, Back } from "gsap";

import { RemoveCircleOutline, AddCircleOutline } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
  capitalize,
} from "@mui/material";

import { CartList, OrderSummary } from "@/components/cart";
import { CartContext } from "@/context/cart/CartContext";
import { ProductSlideshow } from "@/components/Products/ProductSlideshow";
import { ShopLayout } from "@/components/layout/shopLayout";
import { SizeSelector } from "@/components/Products/SizeSelector";
import { ItemCounter } from "@/components/ItemCounter";
import { FormCheckout } from "@/components/FormCheckout";
import axios from "axios";
import Image from "next/image";

const ProductsSlugPage = () => {
  gsap.registerPlugin(ScrollTrigger);

  const { ref, inView, entry } = useInView({
    threshold: 0.9,
    triggerOnce: true,
  });
  const { asPath, push, query } = useRouter();
  const [product, setProduct] = useState();
  const { addProductToCart } = useContext(CartContext);
  const [isCheckauto, setIsCheckaut] = useState(false);
  const [tempCartProduct, setTempCartProduct] = useState({
    _id: product && product._id,
    image: product && product.images[0],
    price: product && product.precio,
    size: undefined,
    slug: product && product.slug,
    title: product && product.titulo,
    gender: product && product.categoria,
    quantity: 1,
  });

  const onUpdateQuantity = (quantity) => {
    setTempCartProduct((currentProduct) => ({
      ...currentProduct,
      quantity,
    }));
  };

  const selectedSize = (size) => {
    setTempCartProduct((currentProduct) => ({
      ...currentProduct,
      size,
    }));
  };

  useEffect(() => {
    getProducts();
  }, []);
  const isMobile = useMediaQuery("(max-width:600px)");

  const getProducts = async () => {
    const data = await axios.get("/api/product");

    const product_ = data.data.filter((e) => e.slug == query.slug);
    setProduct(product_[0]);
    console.log(product_[0].images);
  };

  useEffect(() => {
    isCheckauto &&
      gsap.to(".slugContainer", {
        transform: "scale(0)",
      });
    isCheckauto &&
      gsap.to(".slugContainer", {
        display: "none",
        delay: 1,
      });
    isCheckauto &&
      gsap.to(".formContainerSlug", {
        display: "block",
        delay: 1.3,
      });
    isCheckauto &&
      gsap.to(".formContainerSlug", {
        transform: "scale(1)",
        delay: 1.5,
      });
  }, [isCheckauto]);

  useEffect(() => {
    product &&
      setTempCartProduct({
        _id: product && product._id,
        image: product && product.images[0],
        price: product && product.precio,
        size: undefined,
        slug: product && product.slug,
        title: product && product.titulo,
        gender: product && product.categoria,
        quantity: 1,
      });

    product &&
      gsap.to(".slugContainer", {
        display: "auto",
      });
    product &&
      gsap.to(".slugContainer", {
        opacity: 1,
        delay: .1,
      });
  }, [product]);

  const onAddProduct = () => {
    addProductToCart(tempCartProduct);
    push("/cart");
  };
  const onCheckOut = () => {
    setIsCheckaut(true);
    addProductToCart(tempCartProduct);
  };
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
    <ShopLayout>
      <Box
        sx={{ mx: 2,opacity:0 }}
        className="slugContainer"
      >
        <Box
          sx={{ pt: 10, mb: 2 }}
          display="flex"
          justifyContent={"space-between"}
        >
          <Box sx={{ m: 2 }}>
            <NextLink href="/" passHref>
              <Button color="secondary">Volver</Button>
            </NextLink>
          </Box>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} sx={{display:'flex', justifyContent:'center'}}>
            {product && product.images.length > 0 ? (
              <>
                <ProductSlideshow
                  images={product && product.images}
                  seconds={7000}
                  height={isMobile ? 300 : 600}
                  width={isMobile ? 300 : 600}
                />
              </>
            ) : (
              <>
                {product && (
                  <Image
                    src={product.images[0]}
                    alt=""
                    height={isMobile ? 300 : 600}
                    width={isMobile ? 300 : 600}
                  />
                )}
              </>
            )}
          </Grid>
          <Grid item xs={12} sm={5}>
            <Box display="flex" flexDirection="column">
              {/* titulos */}
              <Box display="flex" justifyContent="center">
                <Typography
                  variant="h1"
                  textAlign={"center"}
                  sx={{ width: 300 }}
                >
                  {product && capitalize(product.titulo)}
                </Typography>
              </Box>

              <Box display="flex" justifyContent="space-around" sx={{ m: 3 }}>
                <NextLink href={`#`} passHref prefetch={false}>

                    <Typography
                      variant="button"
                      sx={{ fontWeight: 800, fontSize: "20px" }}
                    >
                      {product && `${formattwo(product.precio)}`}
                    </Typography>

                </NextLink>
              </Box>
              <Divider sx={{}} />
              <Box sx={{}}>
                <Typography variant="subtitle2" sx={{ m: 2 }}>
                  Cantidad
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <ItemCounter
                    currentValue={tempCartProduct.quantity}
                    updatedQuantity={onUpdateQuantity}
                    maxValue={10}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  display:
                    product && (product.type == "mujer") | "hombre"
                      ? "auto"
                      : "none",
                }}
              >
                <SizeSelector
                  sizes={["XS", "S", "M", "L", "XL"]}
                  selectedSize={tempCartProduct.size}
                  onSelectedSize={selectedSize}
                />
              </Box>

              {/* Descripción */}

              <Box sx={{}} display="flex" justifyContent="center">
                <Typography
                  variant="body2"
                  align="justify"
                  sx={{ mx: 2, mb: 4 }}
                >
                  {product && product.descripcion}
                </Typography>
              </Box>
            </Box>
            <Box display="flex" justifyContent="space-around">
              <Button color="success" size="large" onClick={onAddProduct} startIcon={<svg width={20} fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>cart-plus</title><path d="M11 9H13V6H16V4H13V1H11V4H8V6H11M7 18C5.9 18 5 18.9 5 20S5.9 22 7 22 9 21.1 9 20 8.1 18 7 18M17 18C15.9 18 15 18.9 15 20S15.9 22 17 22 19 21.1 19 20 18.1 18 17 18M7.2 14.8V14.7L8.1 13H15.5C16.2 13 16.9 12.6 17.2 12L21.1 5L19.4 4L15.5 11H8.5L4.3 2H1V4H3L6.6 11.6L5.2 14C5.1 14.3 5 14.6 5 15C5 16.1 5.9 17 7 17H19V15H7.4C7.3 15 7.2 14.9 7.2 14.8Z" /></svg>}>
                Agregar al carrito
              </Button>
              {/* <Button color="success" size="large" onClick={() => onCheckOut()}>
                Comprar ahora
              </Button> */}
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box
        className="formContainerSlug"
        sx={{ transform: "scale(0)", mt: 10, mx: 2, display: "none" }}
      >
        <CartList />
        <OrderSummary />
        <FormCheckout />
      </Box>
    </ShopLayout>
  );
};

export default ProductsSlugPage;
