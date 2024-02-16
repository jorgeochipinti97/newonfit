import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

import NextLink from "next/link";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import PaymentIcon from "@mui/icons-material/Payment";
import { useInView } from "react-intersection-observer";
import Chip from "@mui/material/Chip";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { Power1, gsap } from "gsap";

import {
  Box,
  Button,
  Divider,
  Grid,
  Typography,
  useMediaQuery,
  capitalize,
  Alert,
  Modal,
} from "@mui/material";

import { CartList, OrderSummary } from "@/components/cart";
import { CartContext } from "@/context/cart/CartContext";
import { ProductSlideshow } from "@/components/Products/ProductSlideshow";
import { ShopLayout } from "@/components/layout/shopLayout";
import { SizeSelector } from "@/components/Products/SizeSelector";
import { ItemCounter } from "@/components/ItemCounter";
import { FormCheckout } from "@/components/FormCheckout";

import Image from "next/image";
import { useProduct } from "@/Hooks/UseProducts";

const ProductDescription = ({ descripcion }) => {
  return <div dangerouslySetInnerHTML={{ __html: descripcion }} />;
};
const ProductsSlugPage = () => {
  const [openSizeGuide, setOpenSizeGuide] = useState(false);
  const [imgSize, setImgSize] = useState("");

  gsap.registerPlugin(ScrollTrigger);
  const [isAdd, setIsAdd] = useState(false);
  const { query } = useRouter();
  const [product, setProduct] = useState();
  const [talles_, setTalles] = useState();

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
    sku: product && product.sku,

    quantity: 1,
  });

  const { products } = useProduct();
  useEffect(() => {
    const p = products.filter((e) => e.slug == query.slug);
    setProduct(p[0]);
  }, [products]);

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

  const isMobile = useMediaQuery("(max-width:600px)");

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
        sku: product && product.sku,
        gender: product && product.categoria,
        subcategoria: product && product.subcategoria,
        quantity: 1,
      });

    product &&
      gsap.to(".slugContainer", {
        display: "auto",
      });
    product &&
      gsap.to(".slugContainer", {
        opacity: 1,
        delay: 0.1,
      });
    product &&
      setTalles(
        product.talles
          .filter((talle) => talle.stock >= 1)
          .map((talle) => talle.nombre)
      );

    if (product) {
      const tituloLower = product.titulo.toLowerCase();
      if (tituloLower.includes("remera") || tituloLower.includes("musculosa")) {
        setImgSize("/tablaremeras.jpg");
      } else if (tituloLower.includes("short")) {
        setImgSize("/tablashort.jpg");
      } else if (tituloLower.includes("buzo")) {
        setImgSize("/tablabuzos.jpg");
      }
    }
  }, [product]);

  useEffect(() => {
    console.log(imgSize);
  }, [imgSize]);

  useEffect(() => {
    isAdd &&
      gsap.to(".isAdd", {
        opacity: 1,
        ease: Power1.easeIn,
      });
    setInterval(() => {
      gsap.to(".isAdd", {
        opacity: 0,
        ease: Power1.easeIn,
      });
      setIsAdd(false);
    }, [4000]);
  }, [isAdd]);

  const onAddProduct = () => {
    !tempCartProduct.size && alert("Selecciona un talle");
    addProductToCart(tempCartProduct);
    setIsAdd(true);
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
      <Alert
        // icon={<CheckIcon fontSize="inherit" />}
        sx={{
          position: "fixed",
          bottom: isMobile ? 100 : 50,
          right: 10,
          opacity: "0",
          zIndex: "999",
        }}
        severity="success"
        className="isAdd"
      >
        agregado correctamente
      </Alert>

      <Box
        sx={{ mx: 2, opacity: 0, minHeight: "130vh" }}
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
          <Grid
            item
            xs={12}
            sm={6}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            {product && product.images.length > 0 ? (
              <ProductSlideshow
                images={product && product.images}
                seconds={7000}
                height={isMobile ? 300 : 850}
                width={isMobile ? 300 : 550}
              />
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
                <Box
                  display="flex"
                  justifyContent="center"
                  sx={{
                    width: "fit-content",
                    borderRadius: "19px",
                    p: 2,
                  }}
                >
                  <Typography
                    variant="h1"
                    textAlign={"center"}
                    sx={{ width: 300, color: "black" }}
                  >
                    {product && capitalize(product.titulo)}
                  </Typography>
                </Box>
              </Box>

              <Box
                display="flex"
                justifyContent="center"
                sx={{ mt: 3, width: "100%" }}
              >
                <Typography
                  variant="button"
                  sx={{
                    fontWeight: 800,
                    fontSize: "15px",

                    px: 2,
                    py: 1,
                    mx: 2,
                    borderRadius: "19px",
                  }}
                >
                  {product && `${formattwo(product.precio)}`}
                </Typography>
                <Box display="flex" justifyContent="space-around">
                  <Button
                    color="success"
                    size={isMobile ? "small" : "large"}
                    onClick={onAddProduct}
                    sx={{ mx: 2 }}
                    disabled={!tempCartProduct.size ? true : false}
                    startIcon={
                      <svg
                        width={20}
                        fill="white"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <title>cart-plus</title>
                        <path d="M11 9H13V6H16V4H13V1H11V4H8V6H11M7 18C5.9 18 5 18.9 5 20S5.9 22 7 22 9 21.1 9 20 8.1 18 7 18M17 18C15.9 18 15 18.9 15 20S15.9 22 17 22 19 21.1 19 20 18.1 18 17 18M7.2 14.8V14.7L8.1 13H15.5C16.2 13 16.9 12.6 17.2 12L21.1 5L19.4 4L15.5 11H8.5L4.3 2H1V4H3L6.6 11.6L5.2 14C5.1 14.3 5 14.6 5 15C5 16.1 5.9 17 7 17H19V15H7.4C7.3 15 7.2 14.9 7.2 14.8Z" />
                      </svg>
                    }
                  >
                    Agregar al carrito
                  </Button>
                </Box>
              </Box>
              <Divider sx={{ my: 2 }} />
              {product && (
                <>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Chip
                      icon={<PaymentIcon />}
                      sx={{
                        fontWeight: "800",
                        p: 2,
                        fontSize: isMobile ? "15px" : "20px",
                        mb: 2,
                      }}
                      label={`3 cuotas sin interés de ${formattwo(
                        product.precio / 3
                      )}`}
                      color="success"
                      variant="outlined"
                    />
                  </div>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Button
                      variant="outlined"
                      onClick={() => setOpenSizeGuide(true)}
                      color="primary"
                      sx={{ mb: 2 }}
                    >
                      Ver guia de talles
                    </Button>

                    <Modal
                      open={openSizeGuide}
                      onClose={() => setOpenSizeGuide(false)}
                      aria-labelledby="child-modal-title"
                      aria-describedby="child-modal-description"
                    >
                      <Box
                        sx={{
                          background: "rgba(0,0,0,0.5)",
                          height: "100vh",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
<img src={imgSize} alt="" style={{width:isMobile ?'80%':'30%'}}/>
                          <Button
                            sx={{ mt: 2 }}
                            onClick={() => setOpenSizeGuide(false)}
                          >
                            Cerrar
                          </Button>
                        </div>
                      </Box>
                    </Modal>
                  </Box>

                  <Box
                    display={
                      product.categoria == "hombres" ||
                      product.categora == "mujeres"
                        ? "flex"
                        : "none"
                    }
                    sx={{
                      width: "100%",
                      justifyContent: "center",
                    }}
                  >
                    <SizeSelector
                      sizes={talles_}
                      selectedSize={tempCartProduct.size}
                      onSelectedSize={selectedSize}
                    />
                  </Box>
                  <p
                    style={{
                      textAlign: "center",
                      marginTop: "5px",
                      display: tempCartProduct.size ? "none" : "auto",
                    }}
                  >
                    Selecciona un talle para continuar
                  </p>
                </>
              )}

              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{ mt: 2, fontWeight: "600" }}
                >
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
            </Box>
            {product && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Chip
                    icon={<LocalShippingIcon />}
                    sx={{
                      fontWeight: "600",
                      p: 2,
                      fontSize: "15px",
                      mb: 5,
                      color: "black",
                    }}
                    label="Envio gratis a CABA / AMBA"
                    variant="filled"
                  />
                </div>
                <ProductDescription descripcion={product.descripcion} />
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </ShopLayout>
  );
};

export default ProductsSlugPage;
