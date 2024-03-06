import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Grid, TextField } from "@mui/material";
import { CartContext } from "@/context/cart/CartContext";

import { v4 as uuidv4 } from "uuid";
import SendIcon from "@mui/icons-material/Send";
import { useRouter } from "next/router";

export const FormCheckout = ({ updateFormData,setIsCheckout }) => {
  const trackId = uuidv4();
  const { push } = useRouter();
  const { cart, numberOfItems } = useContext(CartContext);




  const [shippingData, setShippingData] = useState({
    firstName: "",
    lastName: "",
    idNumber: "",
    email: "",
    address: "",
    addressNumber: "",
    piso: "",
    city: "",
    provincia: "",
    mobile: "",
    postalCode: "",
    localidad:"",
    piso:"",
    deliveryNote: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setShippingData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    updateFormData({ [name]: value }, "shippingDetails");
  };

  const handleSubmit = (event) => {
    event.preventDefault();


    updateFormData({ cart: cart }, "shippingDetails");
    setIsCheckout(true)
  };



  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            name="firstName"
            label="Nombre"
            variant="filled"
            fullWidth
            required
            value={shippingData.firstName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="lastName"
            label="Apellido"
            variant="filled"
            fullWidth
            required
            value={shippingData.lastName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="idNumber"
            label="DNI"
            variant="filled"
            fullWidth
            required
            value={shippingData.idNumber}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="email"
            label="Email"
            variant="filled"
            fullWidth
            required
            value={shippingData.email}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="address"
            label="Direccion"
            variant="filled"
            fullWidth
            required
            value={shippingData.address}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="addressNumber"
            label="Número"
            variant="filled"
            fullWidth
            required
            value={shippingData.addressNumber}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="piso"
            label="Departamento"
            variant="filled"
            fullWidth
            value={shippingData.piso}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="city"
            label="Ciudad"
            variant="filled"
            fullWidth
            required
            value={shippingData.city}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="localidad"
            label="Localidad"
            variant="filled"
            fullWidth
            required
            value={shippingData.localidad}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="provincia"
            label="Provincia"
            variant="filled"
            fullWidth
            required
            value={shippingData.provincia}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="mobile"
            label="Celular"
            variant="filled"
            fullWidth
            required
            value={shippingData.mobile}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="postalCode"
            label="Código postal"
            variant="filled"
            fullWidth
            required
            value={shippingData.postalCode}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="deliveryNote"
            label="Nota adicional"
            variant="filled"
            fullWidth
            value={shippingData.deliveryNote}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      <Box sx={{ mt: 5 }} display="flex" justifyContent="center">
        <Button
          type="submit"
          color="secondary"
          className="circular-btn"
          size="large"
          sx={{ display: "flex", alignItems: "center" }}
          startIcon={<SendIcon />}
        >
          Enviar
        </Button>
      </Box>
    </form>
  );
};
