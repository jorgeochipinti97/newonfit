import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

import NextLink from "next/link";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
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

import { CartContext } from "@/context/cart/CartContext";
import { ProductSlideshow } from "@/components/Products/ProductSlideshow";
import { ShopLayout } from "@/components/layout/shopLayout";
import { SizeSelector } from "@/components/Products/SizeSelector";
import { ItemCounter } from "@/components/ItemCounter";
import { FormCheckout } from "@/components/FormCheckout";

import Image from "next/image";
import { useProduct } from "@/Hooks/UseProducts";
import useFacebookPixel from "@/Hooks/usePixelFacebook";

const ProductDescription = ({ descripcion }) => {
  return (
    <div
      style={{ marginBottom: "50px" }}
      dangerouslySetInnerHTML={{ __html: descripcion }}
    />
  );
};
const ProductsSlugPage = () => {
  const trackEvent = useFacebookPixel();
  const [openSizeGuide, setOpenSizeGuide] = useState(false);
  const [imgSize, setImgSize] = useState("");

  gsap.registerPlugin(ScrollTrigger);
  const [isAdd, setIsAdd] = useState(false);
  const { query } = useRouter();
  const [product, setProduct] = useState();
  const [talles_, setTalles] = useState();
  const [sku_, setSku] = useState("");
  const { addProductToCart } = useContext(CartContext);
  const [isCheckauto, setIsCheckaut] = useState(false);

  const [tempCartProduct, setTempCartProduct] = useState({
    _id: product && product._id,
    image: product && product.images[0],
    price: product && product.precio,
    size: "",
    slug: product && product.slug,
    title: product && product.titulo,
    gender: product && product.categoria,
    sku: "",
    quantity: 1,
  });
  const sku = [
    { name: "65cc0ed0cc62de1de4a5b7f6 L", Sku: "AMBITNEGL" },
    { name: "65cc0ed0cc62de1de4a5b7f6 M", Sku: "AMBITNEGM" },
    { name: "65cc0ed0cc62de1de4a5b7f6 S", Sku: "AMBITNEGS" },
    { name: "65cc0ed0cc62de1de4a5b7f6 XL", Sku: "AMBITNEGXL" },
    { name: "65cc1028cc62de1de4a5b816 L", Sku: "ANTICNEGNEGL" },
    { name: "65cc1028cc62de1de4a5b816 M", Sku: "ANTICNEGNEGM" },
    { name: "65cc1028cc62de1de4a5b816 S", Sku: "ANTICNEGNEGS" },
    { name: "65cc13c5312e0e39f55b92e7 L", Sku: "ARNOLDNEGL" },
    { name: "65cc13c5312e0e39f55b92e7 M", Sku: "ARNOLDNEGM" },
    { name: "65cc13c5312e0e39f55b92e7 S", Sku: "ARNOLDNEGS" },
    { name: "65cc13c5312e0e39f55b92e7 XL", Sku: "ARNOLDNEGXL" },
    { name: "65cc150c312e0e39f55b92fa L", Sku: "BASQUETNEGL" },
    { name: "65cc150c312e0e39f55b92fa M", Sku: "BASQUETNEGM" },
    { name: "65cc150c312e0e39f55b92fa XL", Sku: "BASQUETNEGXL" },
    { name: "65cc15fa312e0e39f55b930f L", Sku: "DREAMNEGL" },
    { name: "65cc15fa312e0e39f55b930f M", Sku: "DREAMNEGM" },
    { name: "65cc15fa312e0e39f55b930f XL", Sku: "DREAMNEGXL" },
    { name: "65cc1737312e0e39f55b9327 L", Sku: "PLANECANGUL" },
    { name: "65cc1737312e0e39f55b9327 XL", Sku: "PLANECANGUXL" },
    { name: "65cc1820312e0e39f55b9342 L", Sku: "ROCKYCANL" },
    { name: "65cc1820312e0e39f55b9342 M", Sku: "ROCKYCANM" },
    { name: "65cc1820312e0e39f55b9342 XL", Sku: "ROCKYCANXL" },
    { name: "65cc18da312e0e39f55b9360 L", Sku: "CABLANL" },
    { name: "65cc18da312e0e39f55b9360 M", Sku: "CABLANM" },
    { name: "65cc18da312e0e39f55b9360 XL", Sku: "CABLANXL" },
    { name: "65cc19f0312e0e39f55b9383 L", Sku: "JAPONBLANL" },
    { name: "65cc19f0312e0e39f55b9383 M", Sku: "JAPONBLANM" },
    { name: "65cc19f0312e0e39f55b9383 S", Sku: "JAPONBLANS" },
    { name: "65cc19f0312e0e39f55b9383 XL", Sku: "JAPONBLANXL" },
    { name: "65cc1a8a312e0e39f55b93aa L", Sku: "LUNANEGL" },
    { name: "65cc1a8a312e0e39f55b93aa M", Sku: "LUNANEGM" },
    { name: "65cc1a8a312e0e39f55b93aa S", Sku: "LUNANEGS" },
    { name: "65cc1a8a312e0e39f55b93aa XL", Sku: "LUNANEGXL" },
    { name: "65cc1b42312e0e39f55b93d5 L", Sku: "MARINEGL" },
    { name: "65cc1b42312e0e39f55b93d5 M", Sku: "MARINEGM" },
    { name: "65cc1b42312e0e39f55b93d5 S", Sku: "MARINEGS" },
    { name: "65cc1bff312e0e39f55b9402 L", Sku: "PIRABLANL" },
    { name: "65cc1bff312e0e39f55b9402 M", Sku: "PIRABLANM" },
    { name: "65cc1bff312e0e39f55b9402 S", Sku: "PIRABLANS" },
    { name: "65cc1bff312e0e39f55b9402 XL", Sku: "PIRABLANXL" },
    { name: "65cc4ad43d9e3e9a8c718732 L", Sku: "SHORTGRISL" },
    { name: "65cc4ad43d9e3e9a8c718732 M", Sku: "SHORTGRISM" },
    { name: "65cc4ad43d9e3e9a8c718732 XL", Sku: "SHORTGRISXL" },
    { name: "65cc4a6f3d9e3e9a8c7186fd M", Sku: "SHORTNEGM" },
    { name: "65cc4a6f3d9e3e9a8c7186fd XL", Sku: "SHORTNEGXL" },
  ];

  const obtenerSkuPorIdYTalle = (id, talle) => {
    const resultado = sku.find((s) => {
      const [skuId, skuTalle] = s.name.split(" ");
      return skuId === id && skuTalle === talle;
    });

    // Retorna el Sku si se encontró una coincidencia, de lo contrario retorna un string vacío
    return resultado ? resultado.Sku : "";
  };

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
        price:
          product && product.precioDescuento > 0
            ? product.precioDescuento
            : product.precio,
        size: "M",
        slug: product && product.slug,
        title: product && product.titulo,
        sku: sku_,
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
    isAdd &&
      gsap.to(".isAdd", {
        opacity: 1,
        ease: Power1.easeIn,
      });
    isAdd &&
      setInterval(() => {
        gsap.to(".isAdd", {
          opacity: 0,
          ease: Power1.easeIn,
        });
        setIsAdd(false);
      }, [4000]);
  }, [isAdd]);

  const onAddProduct = () => {
    // Si el producto NO es un accesorio Y no se ha seleccionado un talle,
    // entonces alertar al usuario para que seleccione un talle.
    if (
      product.categoria !== "accesorios" &&
      product.categoria !== "equipamiento" &&
      !tempCartProduct.size
    ) {
      alert("Selecciona un talle");
      return; // Detiene la ejecución de la  función aquí para evitar agregar el producto.
    }

    // Si el producto es un accesorio o ya se seleccionó un talle, proceder a agregar al carrito.
    addProductToCart({
      ...tempCartProduct,

      sku: tempCartProduct.size
        ? obtenerSkuPorIdYTalle(tempCartProduct._id, tempCartProduct.size)
        : "",
    });

    trackEvent("AddToCart", {
      content_ids: [product._id],
      content_type: product.titulo,
      value: product.precio,
      currency: "ARS",
    });

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
        {product && (
          <>
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
                {product && product.images.length === 1 ? (
                  <img
                    src={product.images[0]}
                    alt={product.titulo || "Product Image"} // Agregué un alt descriptivo por accesibilidad
                    style={{ width: "50%" }}
                  />
                ) : (
                  <ProductSlideshow
                    images={product && product.images}
                    seconds={7000}
                    height={isMobile ? 300 : 850}
                    width={isMobile ? 300 : 550}
                  />
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
                    sx={{ width: "100%" }}
                  >
                    <span style={{ display: "flex", justifyCenter: "center" }}>
                      Llevala en 3 cuotas sin interés de{" "}
                      <span style={{ fontWeight: "bold", marginLeft: "5px" }}>
                        {product && product.precioDescuento
                          ? formattwo(product.precioDescuento / 3)
                          : formattwo(product.precio / 3)}
                      </span>{" "}
                    </span>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="center"
                    sx={{ width: "100%" }}
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
                      {product.precioDescuento > 0 ? (
                        <>
                          <Typography
                            variant="button"
                            sx={{
                              textDecoration: "line-through",
                              fontWeight: 800,
                              fontSize: "25px",
                              color: "#9e1b32",
                              px: 2,
                              py: 1,
                              mx: 2,
                              borderRadius: "19px",
                            }}
                          >
                            {formattwo(product.precio)}
                          </Typography>
                          <Typography
                            variant="button"
                            sx={{
                              fontWeight: 800,
                              fontSize: "25px",
                              px: 2,
                              py: 1,
                              mx: 2,
                              borderRadius: "19px",
                              color: "black",
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
                            fontSize: "25px",
                            px: 2,
                            py: 1,
                            mx: 2,
                            borderRadius: "19px",
                          }}
                        >
                          {formattwo(product.precio)}
                        </Typography>
                      )}{" "}
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="space-around "
                    sx={{ mt: 2 }}
                  >
                    <Button
                      color="success"
                      size={isMobile ? "small" : "large"}
                      onClick={onAddProduct}
                      sx={{ mx: 2 }}
                      disabled={
                        product.categoria !== "accesorios" &&
                        product.categoria !== "equipamiento" &&
                        !tempCartProduct.size
                      }
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
                  <Divider sx={{ my: 2 }} />
                  {product && (
                    <>
                      {/* <div style={{ display: "flex", justifyContent: "center" }}>
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
                  </div> */}
                      <Box
                        sx={{
                          display:
                            product.categoria == "hombres" ||
                            product.categoria == "mujeres"
                              ? "flex"
                              : "none",
                          justifyContent: "center",
                        }}
                      >
                        <Button
                          variant="outlined"
                          onClick={() => setOpenSizeGuide(true)}
                          color="primary"
                          sx={{ mb: 2 }}
                        >
                          Guia de talles
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
                              <img
                                src={imgSize}
                                alt=""
                                style={{ width: isMobile ? "80%" : "30%" }}
                              />
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
                          product.categoria == "mujeres"
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
                          display:
                            product.categoria !== "accesorios" &&
                            product.categoria !== "equipamiento" &&
                            !tempCartProduct.size
                              ? "block"
                              : "none",
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
                        label="Envio gratis a toda la Argentina"
                        variant="filled"
                      />
                    </div>
                    <ProductDescription descripcion={product.descripcion} />
                  </Box>
                )}
              </Grid>
            </Grid>
          </>
        )}
      </Box>
    </ShopLayout>
  );
};

export default ProductsSlugPage;
