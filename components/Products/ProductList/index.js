import { useRouter } from "next/router";
import { Grid, useMediaQuery } from "@mui/material";
import { ProductCard } from "../ProductCard";

export const ProductList = ({ products }) => {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <>
      <Grid container spacing={1} sx={{ minHeight:'100vh',mt:2 }}>
        {products.map((product) => (
          <ProductCard
            isMobile={isMobile}
            key={product.slug}
            product={product}
          />
        ))}
      </Grid>
    </>
  );
};
