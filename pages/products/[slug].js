
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

const ProductsSlugPage = () => {

  let productos = [
    {
        description: '',
        images: ['https://res.cloudinary.com/dcvieavco/image/upload/v1678770676/bcaa_jkribb.jpg','https://res.cloudinary.com/dcvieavco/image/upload/v1678770676/bcaa_jkribb.jpg'],
        price: 100,
        slug: 'bcca_suplemento',
        title: 'BCCA suplemento',
        type: 'suplementos',
    },
    {
        description: '',
        images: ['https://res.cloudinary.com/dcvieavco/image/upload/v1678770676/AnyConv.com__beta_alanina_qqmry0.jpg','https://res.cloudinary.com/dcvieavco/image/upload/v1678770676/AnyConv.com__beta_alanina_qqmry0.jpg'],
        price: 100,
        slug: 'beta_alanina',
        title: 'Beta Alanina',
        type: 'suplementos',
        subtype:'quemadores'
    },
    {
        description: '',
        images: ['https://res.cloudinary.com/dcvieavco/image/upload/v1678771016/all-over-print-headband-white-front-640d6b10cd16e_bnboh6.jpg','https://res.cloudinary.com/dcvieavco/image/upload/v1678771016/all-over-print-headband-white-product-details-640d6b10cd0de_vulojz.jpg'],
        price: 100,
        slug: 'bincha_onfit',
        title: 'Bincha Onfit',
        type: 'accesorios',
        subtype:'gorros'
    },
    {
        description: '',
        images: ['https://res.cloudinary.com/dcvieavco/image/upload/v1678770791/all-over-print-duffle-bag-white-front-640d698356adc_tooa8c.jpg','https://res.cloudinary.com/dcvieavco/image/upload/v1678770791/all-over-print-duffle-bag-white-front-640d698356adc_tooa8c.jpg'],
        price: 100,
        slug: 'bolso_deportivo',
        title: 'Bolso Onfit',
        type: 'accesorios',
        subtype:'bolsos'
    },
    {
        description: '',
        images: ['https://res.cloudinary.com/dcvieavco/image/upload/v1678770982/stainless-steel-water-bottle-black-17oz-front-640d672f77c6b_gxmaz7.jpg','https://res.cloudinary.com/dcvieavco/image/upload/v1678770983/stainless-steel-water-bottle-black-17oz-front-640d670f8245a_lj8ojc.jpg'],
        price: 100,
        slug: 'botella_onfit',
        title: 'Botella Onfit',
        type: 'accesorios',
        subtype:'botellas'
    },
    {
        description: '',
        images: ['https://res.cloudinary.com/dcvieavco/image/upload/v1678771025/AnyConv.com__D_NQ_NP_960149-MLA53279087293_012023-O_ezgqcy.jpg','https://res.cloudinary.com/dcvieavco/image/upload/v1678771025/AnyConv.com__D_NQ_NP_960149-MLA53279087293_012023-O_ezgqcy.jpg'],
        price: 100,
        slug: 'caminadora',
        title: 'Caminadora',
        type: 'equipamiento',
        subtype:'maquinas'
    },
    {
        description: '',
        images: ['https://res.cloudinary.com/dcvieavco/image/upload/v1678771074/AnyConv.com__colageno_ex4c02.jpg','https://res.cloudinary.com/dcvieavco/image/upload/v1678771074/AnyConv.com__colageno_ex4c02.jpg'],
        price: 100,
        slug: 'colageno',
        title: 'colageno',
        type: 'suplementos',
        subtype:'vitaminas'
    },
    {
        description: '',
        images: ['https://res.cloudinary.com/dcvieavco/image/upload/v1678770960/all-over-print-longline-sports-bra-white-right-front-640d69387424b_fv2stz.jpg','https://res.cloudinary.com/dcvieavco/image/upload/v1678770960/all-over-print-longline-sports-bra-white-left-front-640d6938741ee_tpl9t0.jpg','https://res.cloudinary.com/dcvieavco/image/upload/v1678770960/all-over-print-longline-sports-bra-white-back-640d693874322_mqann7.jpg','https://res.cloudinary.com/dcvieavco/image/upload/v1678770960/all-over-print-longline-sports-bra-white-front-640d693874177_rrrvw9.jpg'],
        price: 100,
        slug: 'corpinio_onfit',
        title: 'corpiño onfit',
        type: 'mujer',
        subtype:'top'
    },
    {
        description: '',
        images: ['https://res.cloudinary.com/dcvieavco/image/upload/v1678770929/AnyConv.com__escultor_cieacv.jpg','https://res.cloudinary.com/dcvieavco/image/upload/v1678770929/AnyConv.com__escultor_cieacv.jpg'],
        price: 100,
        slug: 'escultor',
        title: 'escultor',
        type: 'suplementos',
        subtype:'quemadores'
    },
    {
        description: '',
        images: ['https://res.cloudinary.com/dcvieavco/image/upload/v1678770868/AnyConv.com__glutamina_ipra3i.jpg','https://res.cloudinary.com/dcvieavco/image/upload/v1678770868/AnyConv.com__glutamina_ipra3i.jpg'],
        price: 100,
        slug: 'glutamina',
        title: 'glutamina',
        type: 'suplementos',
        subtype:'vitaminas'
    },
    {
        description: '',
        images: ['https://res.cloudinary.com/dcvieavco/image/upload/v1678770735/classic-dad-hat-white-front-640d61cc7646a_c94xtv.png','https://res.cloudinary.com/dcvieavco/image/upload/v1678770732/classic-dad-hat-white-front-640d61cc7637e_bpo49l.png','https://res.cloudinary.com/dcvieavco/image/upload/v1678770733/classic-dad-hat-black-front-640d61cc7617d_kxghde.png'],
        price: 100,
        slug: 'gorra_onfit',
        title: 'gorra onfit',
        type: 'accesorios',
        subtype:'gorros'
    },
    {
        description: '',
        images: ['https://res.cloudinary.com/dcvieavco/image/upload/v1678770825/all-over-print-leggings-white-front-640d628bc873f_z8kpv9.jpg','https://res.cloudinary.com/dcvieavco/image/upload/v1678770825/leggins_ewfjyd.jpg'],
        price: 100,
        slug: 'leggins_onfit',
        title: 'leggins onfit',
        type: 'mujer',
        subtype:'calza',
    
    },
    {
        description: '',
        images: ['https://res.cloudinary.com/dcvieavco/image/upload/v1678771038/sports-leggings-white-front-640d68c766fdc_lqx9kc.jpg','https://res.cloudinary.com/dcvieavco/image/upload/v1678771038/sports-leggings-white-right-front-640d68c7673d8_trdijr.jpg'],
        price: 100,
        slug: 'leggins_deportivos',
        title: 'leggins deportivos',
        type: 'mujer',
        subtype:'calza'
    },

    {
        description: '',
        images: ['https://res.cloudinary.com/dcvieavco/image/upload/v1678770971/all-over-print-minimalist-backpack-white-right-640d60e9dfb83_1_wiw9vg.jpg','https://res.cloudinary.com/dcvieavco/image/upload/v1678770971/all-over-print-minimalist-backpack-white-left-640d60e9dfae1_i9xmyt.jpg','https://res.cloudinary.com/dcvieavco/image/upload/v1678770971/all-over-print-minimalist-backpack-white-right-640d60e9dfb83_ooyce4.jpg'],
        price: 100,
        slug: 'mochila_onfit',
        title: 'mochila onfit',
        type: 'accesorios',
        subtype:'bolsos'
    },
    {
        description: '',
        images: ['https://res.cloudinary.com/dcvieavco/image/upload/v1678770880/mens-premium-tank-top-black-front-2-640d6a08a1984_dkls4c.png','https://res.cloudinary.com/dcvieavco/image/upload/v1678770880/mens-premium-tank-top-black-back-640d6a08a1a99_qstdes.png'],
        price: 100,
        slug: 'musculosa',
        title: 'musculosa onfit',
        type: 'hombre',
        subtype:'musculosa'
    },
    {
        description: '',
        images: ['https://res.cloudinary.com/dcvieavco/image/upload/v1678770800/AnyConv.com__pre_entreno_cqax8z.jpg','https://res.cloudinary.com/dcvieavco/image/upload/v1678770800/AnyConv.com__pre_entreno_cqax8z.jpg'],
        price: 100,
        slug: 'pre_entreno',
        title: 'pre entreno',
        type: 'suplementos',
        subtype:'creatina'
    },
    {
        description: '',
        images: ['https://res.cloudinary.com/dcvieavco/image/upload/v1678771003/AnyConv.com__protiena_whey_gwl4dx.jpg','https://res.cloudinary.com/dcvieavco/image/upload/v1678771003/AnyConv.com__protiena_whey_gwl4dx.jpg'],
        price: 100,
        slug: 'proteina',
        title: 'proteina',
        type: 'suplementos',
        subtype:'proteina'
    },
    {
        description: '',
        images: ['https://res.cloudinary.com/dcvieavco/image/upload/v1678770903/all-over-print-recycled-unisex-sports-jersey-white-front-640d682e0e707_fxbjod.png','https://res.cloudinary.com/dcvieavco/image/upload/v1678770899/all-over-print-recycled-unisex-sports-jersey-white-front-640d682e0e684_arypmd.png','https://res.cloudinary.com/dcvieavco/image/upload/v1678770894/all-over-print-recycled-unisex-sports-jersey-white-front-640d682e0e52f_xp3aj9.png'],
        price: 100,
        slug: 'remera',
        title: 'Remera Onfit',
        type: 'hombre',
        subtype:'remera oversize'
    },
    {
        description: '',
        images: ['https://res.cloudinary.com/dcvieavco/image/upload/v1678770903/all-over-print-recycled-unisex-sports-jersey-white-front-640d682e0e707_fxbjod.png','https://res.cloudinary.com/dcvieavco/image/upload/v1678770899/all-over-print-recycled-unisex-sports-jersey-white-front-640d682e0e684_arypmd.png','https://res.cloudinary.com/dcvieavco/image/upload/v1678770894/all-over-print-recycled-unisex-sports-jersey-white-front-640d682e0e52f_xp3aj9.png'],
        price: 100,
        slug: 'remera',
        title: 'Remera Onfit',
        type: 'mujer',
        subtype:'remera oversize'
    },
    {
        description: '',
        images: ['https://res.cloudinary.com/dcvieavco/image/upload/v1678771084/AnyConv.com__D_NQ_NP_984611-MLA31466353739_072019-O_plmihi.jpg','https://res.cloudinary.com/dcvieavco/image/upload/v1678771084/AnyConv.com__D_NQ_NP_984611-MLA31466353739_072019-O_plmihi.jpg'],
        price: 100,
        slug: 'set de mancuernas',
        title: 'set de mancuernas',
        type: 'equipamiento',
        subtype:'mancuernas'
    },
    {
        description: '',
        images: ['https://res.cloudinary.com/dcvieavco/image/upload/v1678770993/shaker_gqwwuu.jpg','https://res.cloudinary.com/dcvieavco/image/upload/v1678770993/shaker_gqwwuu.jpg'],
        price: 100,
        slug: 'shaker',
        title: 'shaker',
        type: 'accesorios',
        subtype:'shakers'
    },
    {
        description: '',
        images: ['https://res.cloudinary.com/dcvieavco/image/upload/v1678770775/all-over-print-mens-recycled-athletic-shorts-white-front-640aa0b67d735_oiwdif.png','https://res.cloudinary.com/dcvieavco/image/upload/v1678770774/all-over-print-mens-recycled-athletic-shorts-white-front-640aa0b67d133_iyaorx.png','https://res.cloudinary.com/dcvieavco/image/upload/v1678770774/all-over-print-mens-recycled-athletic-shorts-white-right-640aa0b67d4a7_lso8ra.png'],
        price: 100,
        slug: 'short_hombre',
        title: 'short hombre',
        type: 'hombre',
        subtype:'short'
    },
    {
        description: '',
        images: ['https://res.cloudinary.com/dcvieavco/image/upload/v1678770856/all-over-print-womens-recycled-athletic-shorts-white-front-640d678ad5907_wg1xx2.jpg','https://res.cloudinary.com/dcvieavco/image/upload/v1678770856/all-over-print-womens-recycled-athletic-shorts-white-right-640d678ad59e4_uuomd2.jpg','https://res.cloudinary.com/dcvieavco/image/upload/v1678770856/all-over-print-womens-recycled-athletic-shorts-white-front-640d678ad5a2d_tioqb4.jpg','https://res.cloudinary.com/dcvieavco/image/upload/v1678770856/all-over-print-womens-recycled-athletic-shorts-white-left-640d678ad5996_r7oy0i.jpg'],
        price: 100,
        slug: 'short_femenino',
        title: 'short femenino',
        type: 'mujer',
subtype:'short'
    },
    {
        description: '',
        images: ['https://res.cloudinary.com/dcvieavco/image/upload/v1678770916/all-over-print-sports-bra-black-left-640d65f70a970_y2j9wl.jpg','https://res.cloudinary.com/dcvieavco/image/upload/v1678770916/all-over-print-sports-bra-black-front-640d65f70a5af_wde0of.jpg','https://res.cloudinary.com/dcvieavco/image/upload/v1678770915/all-over-print-sports-bra-black-right-640d65f70a9c5_es9kwk.jpg','https://res.cloudinary.com/dcvieavco/image/upload/v1678770915/all-over-print-sports-bra-black-back-640d65f70aa14_exq1eo.jpg'],
        price: 100,
        slug: 'sujetador_deportivo',
        title: 'sujetador deportivo',
        type: 'mujer',
        subtype:'top'
    },
    {
        description: '',
        images: ['https://res.cloudinary.com/dcvieavco/image/upload/v1678770817/visor-black-front-640d6695138f3_lhaef2.png','https://res.cloudinary.com/dcvieavco/image/upload/v1678770815/visor-black-front-640d669513a5d_grvjiq.png','https://res.cloudinary.com/dcvieavco/image/upload/v1678770814/visor-black-front-640d669513a04_rsgxlp.png'],
        price: 100,
        slug: 'vicera',
        title: 'vicera',
        type: 'accesorios',
        subtype:'gorros'
    },

]


  gsap.registerPlugin(ScrollTrigger);

  const { ref, inView, entry } = useInView({
    threshold: 0.9,
    triggerOnce: true,
  });
  const { asPath, push } = useRouter();
  const [product, setProduct] = useState();
  const { addProductToCart } = useContext(CartContext);
  const [isCheckauto, setIsCheckaut] = useState(false);
  const [tempCartProduct, setTempCartProduct] = useState({
    _id: product && product._id,
    image: product && product.images[0],
    price: product && product.price,
    size: undefined,
    slug: product && product.slug,
    title: product && product.title,
    gender: product && product.gender,
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

  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    const a = productos.filter((e) => asPath.includes(e.slug));
    setProduct(a[0]);
  }, []);

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
      <Box sx={{ mx: 2 }} className="slugContainer">
        <Box
          sx={{ mt: 10, mb: 2 }}
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
          <Grid item xs={12} sm={7}>
            <ProductSlideshow
              images={product && product.images}
              seconds={7000}
              height={isMobile ? 300 : 600}
              width={isMobile ? 300 : 600}
            />
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
                  <Button
                    color="primary"
                    sx={{
                      width: "163px",
                      m: 2,
                      pt: 1,
                      pb: 1,
                      textDecoration: "none",
                    }}
                  >
                    <Typography
                      variant="button"
                      sx={{ fontWeight: 800, fontSize: "20px" }}
                    >
                      {product && `${formattwo(product.precio)}`}
                    </Typography>
                  </Button>
                </NextLink>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Box sx={{ my: 2 }}>
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
              <Box sx={{ m: 1 }} display="flex" justifyContent="justify">
                <Typography variant="subtitle2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptatum itaque nulla delectus, minima fuga, consequatur
                  vitae esse quaerat nam, provident minus libero. Molestiae nisi
                  voluptatum recusandae vero ducimus, modi non veritatis fugiat
                  veniam fugit odit illo molestias facere dolore soluta nobis
                  placeat repellendus doloremque praesentium optio. Praesentium
                  libero accusamus voluptatibus.
                </Typography>
              </Box>

              <Box sx={{ mt: 3 }} display="flex" justifyContent="center">
                <Typography variant="body2" align="justify" sx={{ width: 300 }}>
                  {product && product.description}
                </Typography>
              </Box>
            </Box>
            <Box display="flex" justifyContent="space-around">
              <Button color="success" size="large" onClick={onAddProduct}>
                Agregar al carrito
              </Button>
              <Button color="success" size="large" onClick={() => onCheckOut()}>
                Comprar ahora
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box
        className="formContainerSlug"
        sx={{ transform: "scale(0)", mt: 10, mx: 2 }}
      >
        < CartList/>
        <OrderSummary />
        <FormCheckout />
      </Box>
    </ShopLayout>
  );
};

export default ProductsSlugPage;
