import { Button, MenuItem, Select, TextField } from "@mui/material";
import axios from "axios";

import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import gsap, { Power1 } from "gsap";
import { useRouter } from "next/router";
import { formattwo } from "@/utils/currency";

export const FormularioTarjeta = ({
  total,
  updateFormData,
  submitGlobalForm,
}) => {
  const [tarjetaSeleccionada, setTarjetaSeleccionada] = useState("");
  const [numeroTarjeta, setNumeroTarjeta] = useState("");
  const [codigoSeguridad, setCodigoSeguridad] = useState("");
  const [nombreTitular, setNombreTitular] = useState("");
  const [tipoIdentificacion, setTipoIdentificacion] = useState("dni");
  const [numeroIdentificacion, setNumeroIdentificacion] = useState("");
  const [fechaExpiracion, setFechaExpiracion] = useState("");
  const [cuotas, setcuotas] = useState(1);
  const [isProcesing, setIsProcesing] = useState(false);

  const handleFechaExpiracionChange = (e) => {
    let valor = e.target.value.replace(/\D/g, ""); // Elimina todo lo que no sea dígito
    if (valor.length > 2) {
      valor = valor.substring(0, 2) + "/" + valor.substring(2, 4); // Agrega '/' después de MM
    }

    setFechaExpiracion(valor);
  };

  const tarjetas = [
    { name: "Visa Crédito", value: 1 },
    { name: "Visa Débito", value: 31 },
    { name: "MasterCard Débito", value: 105 },
    { name: "MasterCard Crédito", value: 104 },
    { name: "Maestro Débito", value: 106 },
    { name: "Cabal Débito", value: 108 },
    { name: "Cabal Crédito", value: 63 },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const [mesExpiracion, anioExpiracion] = fechaExpiracion.split("/");

    updateFormData({ totalPesos: Math.round(total * 100) }, "paymentDetails");
    updateFormData(
      {
        tarjetaSeleccionada,
        numeroTarjeta,
        codigoSeguridad,
        nombreTitular,
        tipoIdentificacion,
        numeroIdentificacion,

        mesExpiracion,
        anioExpiracion,
        cuotas,
      },
      "paymentDetails"
    );

    setIsProcesing(true);
  };

  useEffect(() => {
    isProcesing && submitGlobalForm();
  }, [isProcesing]);

  return (
    <>
      <Alert
        icon={<CheckIcon fontSize="inherit" />}
        sx={{
          position: "fixed",
          bottom: 50,
          right: 10,
          opacity: "0",
        }}
        severity="success"
        className="isPaid"
      >
        Su pago fue confirmado
      </Alert>

      <Alert
        sx={{
          position: "fixed",
          bottom: 50,
          right: 10,
          opacity: "0",
        }}
        severity="error"
        className="isError"
      >
        Hubo un problema al procesar su pago
      </Alert>

      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "10px",
          }}
        >
          <label id="tarjeta">Seleccione una tarjeta</label>
          <Select
            style={{
              border: "1px solid black",
              borderRadius: "9px",

              fontSize: "18px",
              width: "50%",
            }}
            id="tarjeta"
            variant="outlined"
            value={tarjetaSeleccionada}
            onChange={(e) => setTarjetaSeleccionada(e.target.value)}
            required
          >
            {tarjetas.map((tarjeta) => (
              <MenuItem key={tarjeta.value} value={tarjeta.value}>
                {tarjeta.name}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div
          style={{
            display:
              tarjetaSeleccionada == "1" ||
              tarjetaSeleccionada == "104" ||
              tarjetaSeleccionada == "63"
                ? "flex"
                : "none",
            flexDirection: "column",
            marginTop: "10px",
          }}
        >
          <Select
            style={{
              border: "1px solid black",
              borderRadius: "9px",
              padding: 3,
              width: "50%",
            }}
            id="tarjeta"
            value={cuotas}
            onChange={(e) => setcuotas(e.target.value)}
            required
          >
            <MenuItem value="">Cantidad de cuotas</MenuItem>
            <MenuItem value={1}>
              <span style={{ fontWeight: "600", marginRight: "5px" }}>1</span>
              Cuota de{" "}
              <span style={{ fontWeight: "600", marginLeft: "5px" }}>
                {" "}
                {formattwo(total)}
              </span>
            </MenuItem>

            <MenuItem value={13}>
              <span style={{ fontWeight: "600", marginRight: "5px" }}>3</span>
              Cuotas sin interes de{" "}
              <span style={{ fontWeight: "600", marginLeft: "5px" }}>
                {" "}
                {formattwo(total / 3)}
              </span>
            </MenuItem>
            <MenuItem value={16}>
              <span style={{ fontWeight: "600", marginRight: "5px" }}>6</span>
              Cuotas de
              <span style={{ fontWeight: "600", marginLeft: "5px" }}>
                {formattwo((total * 1.15) / 6)}{" "}
              </span>
            </MenuItem>
          </Select>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "10px",
          }}
        >
          <TextField
            id="numeroTarjeta"
            label="Numero de Tarjeta"
            variant="filled"
            fullWidth
            value={numeroTarjeta}
            onChange={(e) => setNumeroTarjeta(e.target.value)}
            required
          />
        </div>
        <div style={{ display: "flex", justifyContent: "start" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "10px",
              alignItems: "center",
            }}
          >
            <TextField
              id="fechaExpiracion"
              type="text"
              label="Fecha de vencimiento"
              variant="filled"
              value={fechaExpiracion}
              onChange={handleFechaExpiracionChange}
              maxLength="5"
              placeholder="MM/AA"
              sx={{ width: "fit-content", textAlign: "center", mr: 2 }}
              required
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "10px",
              alignItems: "center",
            }}
          >
            <TextField
              variant="filled"
              label="Código de Seguridad"
              id="codigoSeguridad"
              type="text"
              sx={{ width: "fit-content", mx: 2 }}
              value={codigoSeguridad}
              onChange={(e) => setCodigoSeguridad(e.target.value)}
              required
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "10px",
          }}
        >
          <TextField
            variant="filled"
            id="nombreTitular"
            label="Nombre del Titular"
            type="text"
            value={nombreTitular}
            onChange={(e) => setNombreTitular(e.target.value)}
            required
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "10px",
          }}
        >
          <label htmlFor="tipoIdentificacion">Tipo de Identificación</label>
          <Select
            style={{ width: "fit-content" }}
            id="tipoIdentificacion"
            value={tipoIdentificacion}
            onChange={(e) => setTipoIdentificacion(e.target.value)}
            required
          >
            <MenuItem value="dni">DNI</MenuItem>
            <MenuItem value="ci">CI</MenuItem>
          </Select>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "10px",
          }}
        >
          <TextField
            variant="filled"
            label="Número de Identificación"
            id="numeroIdentificacion"
            type="text"
            value={numeroIdentificacion}
            onChange={(e) => setNumeroIdentificacion(e.target.value)}
            required
          />
        </div>
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <div>
            <Button
              type="submit"
              color="secondary"
              disabled={isProcesing ? true : false}
              className="circular-btn"
              sx={{ mt: 2, px: 2, py: 1, fontSize: "20px" }}
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
              Pagar
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};
