import { productos } from "@/utils/productos";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ProductList } from "../ProductList";
import {
  capitalize,
  Box,
  Button,
  Divider,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  Typography,

} from "@mui/material";
import axios from "axios";

export const ProductFilterPage = () => {

  const [products, setProducts] = useState([]);
  const { asPath } = useRouter();
  const [_productsFiltered, setProductsFiltered] = useState([]);
  const [subtype_, setSubtype_] = useState([]);
  const [type_, setType_] = useState("");

  const getProducts = async () => {
    const data = await axios.get("/api/product");
    setProducts(data.data);
    const allProductos = data.data.filter(
      (e) => e.categoria == asPath.replace("/", "")
    );

    console.log(data.data.map((e) => e.categoria == "accesorios"));
    asPath.includes("accesorios")
      ? setProductsFiltered(
          data.data.filter((e) => e.categoria == "accesorios")
        )
      : setProductsFiltered(allProductos);
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
    asPath == "/hombre" && setCategories(todasCategoriasHombre);
    asPath == "/mujeres" && setCategories(todasCategoriasMujer);
    asPath == "/suplementos" && setCategories(todasCategoriasSuplementos);
    asPath == "/equipamiento" && setCategories(todasCategoriasMaquinas);
    console.log(asPath.replace("/", ""));
  }, []);
  const [categories, setCategories] = useState([]);
  const [select_, setSelect_] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const onChangeSubType = (subType__) => {
    const subtypeFilter = products.filter(
      (e) => e.subcategoria == subType__ && e.categoria == type_
    );
    setProductsFiltered(subtypeFilter);
    setSubtype_(subType__);
    console.log(subtypeFilter);
  };

  return (
    <>
      <Box sx={{ mt: 7 }}>
        <Box>
          <Divider sx={{ my: 1 }} />
          <Box flex={1} />
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          sx={{ flexWrap: { xs: "wrap", sm: "wrap" } }}
        >
          {categories.map((e) => (
            // eslint-disable-next-line react/jsx-key
            <Box key={e} color={subtype_ === e ? "primary" : "info"}>
              <Button
                color={subtype_ === e ? "secondary" : "info"}
                onClick={() => onChangeSubType(e)}
              >
                {capitalize(e)}
              </Button>
            </Box>
          ))}
        </Box>
        <Box display="flex" justifyContent="space-around">
          <Box>
            <FormControl sx={{ m: 3, minWidth: 120 }}>
              <InputLabel id="select-label">Sort By</InputLabel>
              <Select
                labelId="select-label"
                id="select"
                label="sort by"
                value={select_}
                // onChange={(e) => handleSelectChange(e.target.value)}
              >
                <MenuItem value={"low"}>Price: low to high </MenuItem>
                <MenuItem value={"high"}>Price: high to low </MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box>
            <Input
              sx={{ mt: 5 }}
              className="fadeIn"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              placeholder="Search..."
            />
          </Box>
        </Box>
      </Box>

      <>
        <ProductList products={_productsFiltered} />
      </>
    </>
  );
};
