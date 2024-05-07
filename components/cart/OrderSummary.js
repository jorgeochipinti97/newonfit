import { FC, useContext } from "react";
import { Grid, Typography } from "@mui/material";
import { CartContext } from "@/context/cart/CartContext";

export const OrderSummary = ({ orderValues }) => {
  const { numberOfItems, total } = useContext(CartContext);
  const summaryValues = orderValues ? orderValues : { numberOfItems, total };
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
    <Grid container>
      <Grid item xs={6}>
        <Typography>Nº Productos</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>
          {summaryValues.numberOfItems}{" "}
          {summaryValues.numberOfItems > 1 ? "productos" : "producto"}
        </Typography>
      </Grid>
      <Grid item xs={6} sx={{ mt: 2 }}>
        <Typography variant="subtitle1">Total:</Typography>
      </Grid>
      <Grid item xs={6} sx={{ mt: 2 }} display="flex" justifyContent="end">
        <Typography variant="subtitle1">
          {formattwo(summaryValues.total)}
        </Typography>
      </Grid>
      <Grid item xs={12} sx={{  }} display="flex" justifyContent="end">
        <Typography variant="subtitle1">
          3 cuotas de <span style={{fontWeight:'bold', marginLeft:'5px'}}>{formattwo(summaryValues.total /3)}</span>
        </Typography>
      </Grid>
    </Grid>
  );
};
