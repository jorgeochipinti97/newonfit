import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
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
  const {  createOrder, updateAddress } =
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
    try {
      await onCreateOrder();
    } catch (err) {
      alert(err);
    }
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
            sx={{ display: "flex", alignItems: "center" }}
            startIcon={
              <svg
                width={20}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M9 20C9 21.1 8.1 22 7 22S5 21.1 5 20 5.9 18 7 18 9 18.9 9 20M17 18C15.9 18 15 18.9 15 20S15.9 22 17 22 19 21.1 19 20 18.1 18 17 18M7.2 14.8V14.7L8.1 13H15.5C16.2 13 16.9 12.6 17.2 12L21.1 5L19.4 4L15.5 11H8.5L4.3 2H1V4H3L6.6 11.6L5.2 14C5.1 14.3 5 14.6 5 15C5 16.1 5.9 17 7 17H19V15H7.4C7.3 15 7.2 14.9 7.2 14.8M12 9.3L11.4 8.8C9.4 6.9 8 5.7 8 4.2C8 3 9 2 10.2 2C10.9 2 11.6 2.3 12 2.8C12.4 2.3 13.1 2 13.8 2C15 2 16 2.9 16 4.2C16 5.7 14.6 6.9 12.6 8.8L12 9.3Z" />
              </svg>
            }
          >
            Comprar{" "}
          </Button>
        </Box>
      </form>
    </>
  );
};
