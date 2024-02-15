import { productos } from "@/utils/productos";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ProductList } from "../ProductList";
import {
  capitalize,
  Box,
  Button,
  Divider,
  Typography,
  ButtonGroup,
  Grid,
  Slider,
  useMediaQuery,
} from "@mui/material";
import axios from "axios";
import { BorderRight } from "@mui/icons-material";

function valuetext(value) {
  return `${value}°C`;
}

const minDistance = 10;

export const ProductFilterPage = () => {
  const [products, setProducts] = useState([]);
  const { asPath } = useRouter();
  const [_productsFiltered, setProductsFiltered] = useState([]);
  const [subtype_, setSubtype_] = useState([]);
  const [type_, setType_] = useState("");
  const [isNtProcuts, setIsNtProcuts] = useState(false);
  const getProducts = async () => {
    const data = await axios.get("/api/product");
    setProducts(data.data);

    const allProductos = data.data.filter(
      (e) => e.categoria == asPath.replace("/", "")
    );
    const allProductosMen = data.data.filter((e) => "hombres" == e.categoria);
    const oversizeWoman = data.data.filter(
      (e) => e.subcategoria == "remera_oversize"
    );

    asPath == "/mujeres" &&
      setProductsFiltered(oversizeWoman.concat(allProductos));

    asPath == "/indumentaria" &&
      setProductsFiltered(data.data.filter((e) => e.categoria == "hombres"));

    asPath.includes("accesorios") &&
      setProductsFiltered(data.data.filter((e) => e.categoria == "accesorios"));

    asPath != "/mujeres" &&
      asPath != "/accesorios" &&
      asPath != "/indumentaria" &&
      setProductsFiltered(allProductos);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const todasCategoriasHombre = [
    "remera oversize",
    "remera deportiva",
    "musculosa",
    "campera",
    "buzo",
    "short",
    "medias",
  ];
  const todasCategoriasIndumentaria = [
    "remera oversize",
    "buzo",
    "short",
    "musculosa",
  ];
  const todasCategoriasMujer = [
    "remera oversize",
    "remera deportiva",
    "musculosa",
    "top",
    "campera",
    "buzo",
    "calza",
    "short",
    "medias",
  ];
  const todasCategoriasSuplementos = ["proteina", "creatina"];
  const todasCategoriasMaquinas = ["maquinas", "fitness"];

  useEffect(() => {
    setType_(asPath.replace("/", ""));
    asPath == "/hombres" && setCategories(todasCategoriasHombre);
    asPath == "/indumentaria" && setCategories(todasCategoriasIndumentaria);
    asPath == "/mujeres" && setCategories(todasCategoriasMujer);
    asPath == "/suplementos" && setCategories(todasCategoriasSuplementos);
    asPath == "/equipamiento" && setCategories(todasCategoriasMaquinas);
  }, []);
  const [categories, setCategories] = useState([]);
  const [select_, setSelect_] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [value1, setValue1] = React.useState([20, 37]);
  const isMobile = useMediaQuery("(max-width:600px)");

  const handleChange1 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
    }
  };

  const [value2, setValue2] = React.useState([20, 37]);

  const handleChange2 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        setValue2([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue2([clamped - minDistance, clamped]);
      }
    } else {
      setValue2(newValue);
    }
  };
  const onChangeSubType = (subType__) => {
    const formattedSubType = replaceSpacesWithUnderscores(subType__);

    const subtypeFilter = products.filter(
      (e) => e.subcategoria === formattedSubType
    );
    asPath == "/mujeres" || asPath == "indumentaria";
    formattedSubType == "remera_oversize" &&
      setProductsFiltered(
        products.filter(
          (e) =>
            e.subcategoria === formattedSubType && e.categoria === "hombres"
        )
      );

    formattedSubType != "remera_oversize" && setProductsFiltered(subtypeFilter);
    setSubtype_(subType__);

    subtypeFilter.length == 0 && subType__ != "remera oversize"
      ? setIsNtProcuts(true)
      : setIsNtProcuts(false);
    subtypeFilter.length == 0 && subType__ != "remera oversize"
      ? setIsNtProcuts(true)
      : setIsNtProcuts(false);
  };
  const replaceSpacesWithUnderscores = (text) => {
    return text.replace(/\s+/g, "_");
  };
  return (
    <>
      <Box
        sx={{
          pt: isMobile ? 2 : 7,
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      ></Box>
      {/* {isNtProcuts && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography sx={{ fontSize: "30px", fontWeight: "300" }}>
            Proximamente..
          </Typography>
        </Box>
      )} */}
      <Grid container style={{ width: "fit-content" }}>
        <Grid
          item
          lg={3}
          xl={3}
          sm={12}
          xs={12}
          sx={{ display: asPath == "accesorios" ? "none" : "auto" }}
        >
          <Box
            display={"flex"}
            justifyContent={"center"}
            sx={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100vw",
              pt: isMobile ? 7 : 2,
            }}
          >
            <ButtonGroup variant="outlined" color="primary">
              {categories.map((e) => (
                // eslint-disable-next-line react/jsx-key

                <Button
                  key={e}
                  sx={{
                    backgroundColor:
                      subtype_ == e ? "rgba(0,0,0,0.9)" : "white",
                    color: subtype_ == e ? "yellow" : "black",
                    "&:hover": {
                      color: "black",
                      backgroundColor: "gray",
                    },
                  }}
                  color={"primary"}
                  onClick={() => onChangeSubType(e)}
                >
                  {capitalize(e)}
                </Button>
              ))}
            </ButtonGroup>

            {/* <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 4,
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="subtitle1">Filtrar por precio</Typography>
              <Box sx={{ width: 300 }}>
                <Slider
                  getAriaLabel={() => "Minimum distance shift"}
                  value={value2}
                  onChange={handleChange2}
                  valueLabelDisplay="auto"
                  getAriaValueText={valuetext}
                  disableSwap
                />
              </Box>
            </Box> */}
          </Box>
        </Grid>
        <Grid
          item
          lg={12}
          xl={12}
          sm={12}
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            borderLeft: "1px solid black",
          }}
        >
          <ProductList products={_productsFiltered} />
        </Grid>
      </Grid>
    </>
  );
};
