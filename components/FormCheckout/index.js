import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { CartContext } from "@/context/cart/CartContext";

export const FormCheckout = ({}) => {
  const [firstName, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dni, setDni] = useState("");
  const [address, setAddress] = useState("");
  const [zip, setZipCode] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const { shippingAddress, numberOfItems, createOrder, updateAddress } =
    useContext(CartContext);

  const onCreateOrder = async () => {


    const { hasError, message } = await createOrder();

    if (hasError) {
      console.log(message);
      return;
    }
    console.log(message);

    // router.replace(`/orders/${message}`);
  };

  const onSubmitAddress = async () => {
    updateAddress({
      firstName,
      lastName,
      dni,
      address,
      zip,
      phone,
      city,
      email,
    });

    await onCreateOrder();
  };

  return (
    <>
      <form>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Nombre"
              variant="filled"
              fullWidth
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Apellido"
              variant="filled"
              fullWidth
              onChange={(e) => setLastName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="DNI"
              variant="filled"
              fullWidth
              onChange={(e) => setDni(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email"
              variant="filled"
              fullWidth
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Direccion"
              variant="filled"
              fullWidth
              onChange={(e) => setAddress(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Codigo postal"
              variant="filled"
              fullWidth
              onChange={(e) => setZipCode(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Ciudad"
              variant="filled"
              fullWidth
              onChange={(e) => setCity(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Codigo Postal"
              variant="filled"
              fullWidth
              onChange={(e) => setCity(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Celular"
              variant="filled"
              fullWidth
              onChange={(e) => setPhone(e.target.value)}
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 5 }} display="flex" justifyContent="center">
          <Button
            color="secondary"
            className="circular-btn"
            size="large"
            onClick={onSubmitAddress}
          >
            Enviar
          </Button>
        </Box>
      </form>
    </>
  );
};
