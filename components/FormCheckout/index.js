import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Grid, TextField } from "@mui/material";
import { CartContext } from "@/context/cart/CartContext";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import SendIcon from "@mui/icons-material/Send";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

export const FormCheckout = ({}) => {
  const trackId = uuidv4();
  const [firstName, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dni, setDni] = useState("");
  const [address, setAddress] = useState("");
  const [zip, setZipCode] = useState("");
  const [phone, setPhone] = useState("");
  const [altura, setAltura] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [obs, setObs] = useState("");
  const [city, setCity] = useState("");
  const [provincia, setProvincia] = useState("");
  const [email, setEmail] = useState("");
  const { push } = useRouter();
  const { cart, numberOfItems } = useContext(CartContext);

  const productos = cart.map((item) => ({
    largo: item.subcategoria.toLowerCase().includes("remera") ? 32 : 54,
    alto: 5,
    ancho: item.subcategoria.toLowerCase().includes("remera") ? 44 : 42,
    peso: item.subcategoria.toLowerCase().includes("remera") ? 0.3 : 0.5,
    valor: item.price,
    valorContrareembolso: 0,
    cantidad: item.quantity,
    sku: item.sku || "",
    descripcionProducto: item.title,
  }));

  const onCreateOrder = async () => {
    const datosEnvio = {
      productos: productos,
      autentificacion: {
        shipper: 3575,
        password: "yFXGj8WIrB8dNLH",
      },
      destinatario: {
        tipoDocumento: "DNI",
        numeroDocumento: dni,
        nombre: `${firstName} ${lastName}`,
        email: [email],
        telefono: phone,
        celular: phone,
      },
      autorizado: [
        {
          tipoDocumento: "DNI",
          numeroDocumento: dni,
          nombre: `${firstName} ${lastName}`,
          email: [email],
          telefono: phone,
          celular: phone,
        },
      ],
      domicilio: {
        direccion: address,
        altura: altura,
        piso: departamento,
        departamento: departamento,
        codigoPostal: zip,
        localidad: city,
        provincia: provincia,
        latitud: 0,
        longitud: 0,
        telefono: [phone],
      },
      sameday: 0,
      datoNumerico: "",
      codigoSeguimiento: trackId,
      codigoAlternativo: 0,
      modeloSms: "",
      modeloEmail: null,
      servicio: "E",
      marcaDeAgua: "",
      remito: "",
      observaciones: [obs],
    };

    try {
      const data = await axios.post("/api/cargaclients", datosEnvio);
      if (data) {
        const response = await axios.put(
          `/api/orders?_id=${Cookies.get("orderId")}`,
          {
            codGestion: data.data.codGestion,
           
          }
        );
        
        response && push(`/orders/${Cookies.get("orderId")}`);
      }
    } catch (err) {
      alert('algo ha salido mal')
      console.log(err);
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
              required
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Apellido"
              variant="filled"
              fullWidth
              required
              onChange={(e) => setLastName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="DNI"
              variant="filled"
              fullWidth
              required
              onChange={(e) => setDni(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email"
              variant="filled"
              fullWidth
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Direccion"
              variant="filled"
              fullWidth
              required
              onChange={(e) => setAddress(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Altura"
              variant="filled"
              fullWidth
              required
              onChange={(e) => setAltura(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Departamento"
              variant="filled"
              fullWidth
              onChange={(e) => setDepartamento(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Localidad"
              variant="filled"
              fullWidth
              required
              onChange={(e) => setCity(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Provincia"
              variant="filled"
              fullWidth
              required
              onChange={(e) => setProvincia(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Celular"
              variant="filled"
              fullWidth
              required
              onChange={(e) => setPhone(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Codigo postal"
              variant="filled"
              fullWidth
              required
              onChange={(e) => setZipCode(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Observación para la entrega"
              variant="filled"
              fullWidth
              onChange={(e) => setObs(e.target.value)}
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 5 }} display="flex" justifyContent="center">
          <Button
            color="secondary"
            className="circular-btn"
            size="large"
            onClick={onCreateOrder}
            sx={{ display: "flex", alignItems: "center" }}
            startIcon={<SendIcon />}
          >
            Enviar
          </Button>
        </Box>
      </form>
    </>
  );
};
