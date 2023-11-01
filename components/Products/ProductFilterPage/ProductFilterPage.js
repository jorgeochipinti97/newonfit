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
} from "@mui/material";
import axios from "axios";

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
  const todasCategoriasIndumentaria = ["remera oversize", "buzo", "short"];
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
      <Box sx={{ pt: 7 }}>
        <Box>
          <Divider sx={{ my: 1 }} />
          <Box flex={1} />
        </Box>
        <Box display={"flex"} justifyContent={"center"}>
          <ButtonGroup variant="outlined" color="primary">
            {categories.map((e) => (
              // eslint-disable-next-line react/jsx-key

              <Button
              key={e}
                sx={{ backgroundColor: subtype_ == e ? "rgba(0,0,0,0.9)" : "white",color: subtype_ == e ? "yellow" : "black", '&:hover': {
                  color: 'black',
                  backgroundColor: 'gray',
                },  }}
                color={"primary"}
                onClick={() => onChangeSubType(e)}
              >
                {capitalize(e)}
              </Button>
            ))}
          </ButtonGroup>
        </Box>
      </Box>
      {isNtProcuts && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography sx={{ fontSize: "30px", fontWeight: "300" }}>
            Proximamente..
          </Typography>
        </Box>
      )}

      <ProductList products={_productsFiltered} />
    </>
  );
};
