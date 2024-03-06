import { CartContext } from "@/context/cart/CartContext";
import axios from "axios";
import gsap, { Power1 } from "gsap";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

function useGlobalForm() {
  const sku = [
    { name: "65e537dd6b8340a3e1abb82d M", Sku: "SFNTM" },
    { name: "65e537dd6b8340a3e1abb82d L", Sku: "SFNTL" },
    { name: "65e537dd6b8340a3e1abb82d XL", Sku: "SFNTXL" },
    { name: "65e5383c6b8340a3e1abb86a L", Sku: "SFGTL" },
    { name: "65e5383c6b8340a3e1abb86a M", Sku: "SFGTM" },
    { name: "65e5383c6b8340a3e1abb86a XL", Sku: "SFGTXL" },
    { name: "65cc0ed0cc62de1de4a5b7f6 L", Sku: "AMBITNEGL" },
    { name: "65cc0ed0cc62de1de4a5b7f6 M", Sku: "AMBITNEGM" },
    { name: "65cc0ed0cc62de1de4a5b7f6 S", Sku: "AMBITNEGS" },
    { name: "65cc0ed0cc62de1de4a5b7f6 XL", Sku: "AMBITNEGXL" },
    { name: "65cc1028cc62de1de4a5b816 L", Sku: "ANTICNEGL" },
    { name: "65cc1028cc62de1de4a5b816 M", Sku: "ANTICNEGM" },
    { name: "65cc1028cc62de1de4a5b816 S", Sku: "ANTICNEGS" },
    { name: "65cc13c5312e0e39f55b92e7 L", Sku: "ARNOLDNEGL" },
    { name: "65cc13c5312e0e39f55b92e7 M", Sku: "ARNOLDNEGM" },
    { name: "65cc13c5312e0e39f55b92e7 S", Sku: "ARNOLDNEGS" },
    { name: "65cc13c5312e0e39f55b92e7 XL", Sku: "ARNOLDNEGXL" },
    { name: "65cc150c312e0e39f55b92fa L", Sku: "BASQUETNEGL" },
    { name: "65cc150c312e0e39f55b92fa M", Sku: "BASQUETNEGM" },
    { name: "65cc150c312e0e39f55b92fa XL", Sku: "BASQUETNEGXL" },
    { name: "65cc15fa312e0e39f55b930f L", Sku: "DREAMNEGL" },
    { name: "65cc15fa312e0e39f55b930f M", Sku: "DREAMNEGM" },
    { name: "65cc15fa312e0e39f55b930f XL", Sku: "DREAMNEGXL" },

    { name: "65cc1737312e0e39f55b9327 M", Sku: "PLANECANGUM" },
    { name: "65cc1737312e0e39f55b9327 L", Sku: "PLANECANGUL" },
    { name: "65cc1737312e0e39f55b9327 XL", Sku: "PLANECANGUXL" },

    { name: "65cc1820312e0e39f55b9342 L", Sku: "ROCKYCANL" },
    { name: "65cc1820312e0e39f55b9342 M", Sku: "ROCKYCANM" },
    { name: "65cc1820312e0e39f55b9342 XL", Sku: "ROCKYCANXL" },
    { name: "65cc18da312e0e39f55b9360 L", Sku: "CABLANL" },
    { name: "65cc18da312e0e39f55b9360 M", Sku: "CABLANM" },
    { name: "65cc18da312e0e39f55b9360 XL", Sku: "CABLANXL" },
    { name: "65cc19f0312e0e39f55b9383 L", Sku: "JAPONBLANL" },
    { name: "65cc19f0312e0e39f55b9383 M", Sku: "JAPONBLANM" },
    { name: "65cc19f0312e0e39f55b9383 S", Sku: "JAPONBLANS" },
    { name: "65cc19f0312e0e39f55b9383 XL", Sku: "JAPONBLANXL" },
    { name: "65cc1a8a312e0e39f55b93aa L", Sku: "LUNANEGL" },
    { name: "65cc1a8a312e0e39f55b93aa M", Sku: "LUNANEGM" },
    { name: "65cc1a8a312e0e39f55b93aa S", Sku: "LUNANEGS" },
    { name: "65cc1a8a312e0e39f55b93aa XL", Sku: "LUNANEGXL" },
    { name: "65cc1b42312e0e39f55b93d5 L", Sku: "MARINEGL" },
    { name: "65cc1b42312e0e39f55b93d5 M", Sku: "MARINEGM" },
    { name: "65cc1b42312e0e39f55b93d5 S", Sku: "MARINEGS" },
    { name: "65cc1bff312e0e39f55b9402 L", Sku: "PIRABLANL" },
    { name: "65cc1bff312e0e39f55b9402 M", Sku: "PIRABLANM" },
    { name: "65cc1bff312e0e39f55b9402 S", Sku: "PIRABLANS" },
    { name: "65cc1bff312e0e39f55b9402 XL", Sku: "PIRABLANXL" },
    { name: "65cc4ad43d9e3e9a8c718732 L", Sku: "SHORTGRISL" },
    { name: "65cc4ad43d9e3e9a8c718732 M", Sku: "SHORTGRISM" },
    { name: "65cc4ad43d9e3e9a8c718732 XL", Sku: "SHORTGRISXL" },
    { name: "65cc4a6f3d9e3e9a8c7186fd M", Sku: "SHORTNEGM" },
    { name: "65cc4a6f3d9e3e9a8c7186fd XL", Sku: "SHORTNEGXL" },
  ];

  const obtenerSkuPorIdYTalle = (id, talle) => {
    const resultado = sku.find((s) => {
      const [skuId, skuTalle] = s.name.split(" ");
      return skuId === id && skuTalle === talle;
    });

    // Retorna el Sku si se encontró una coincidencia, de lo contrario retorna un string vacío
    return resultado ? resultado.Sku : "";
  };

  const obtenerSiguienteCodigoDeSeguimiento = async () => {
    try {
      const response = await axios.post("/api/codgestion");
      if (response) {
        return response.data.codGestion; // Devuelve directamente el código de seguimiento
      }
    } catch (error) {
      console.error(
        "Error al obtener el siguiente código de seguimiento:",
        error
      );
    }
    return null; // Retorna null si falla la petición o si la respuesta no es válida
  };

  // En el componente de React:
  useEffect(() => {
    async function fetchTrackId() {
      const codigoDeSeguimiento = await obtenerSiguienteCodigoDeSeguimiento();
      if (codigoDeSeguimiento) {
        setTrackId(codigoDeSeguimiento); // Actualiza el estado solo si el código de seguimiento es obtenido con éxito
      }
    }
    fetchTrackId();
  }, []);
  const { cart, numberOfItems, total } = useContext(CartContext);
  const { push } = useRouter();
  const [_idOrder, setIdOrder] = useState(null);

  const [trackId, setTrackId] = useState();

  useEffect(() => {
    if (trackId !== undefined) {
      console.log("trackId actualizado:", trackId);
      // Haz algo con el nuevo trackId aquí
    }
  }, [trackId]);

  const [globalFormData, setGlobalFormData] = useState({
    shippingDetails: {
      firstName: "",
      lastName: "",
      idNumber: "",
      email: "",
      address: "",
      addressNumber: "",
      piso: "",
      city: "",
      localidad: "",
      piso: "",
      provincia: "",
      mobile: "",
      postalCode: "",
      deliveryNote: "",
    },
    paymentDetails: {
      tarjetaSeleccionada: "",
      numeroTarjeta: "",
      mesExpiracion: "",
      anioExpiracion: "",
      codigoSeguridad: "",
      nombreTitular: "",
      tipoIdentificacion: "dni",
      numeroIdentificacion: "",
      totalPesos: 0,
      cuotas: 1,
      discountCode: {},
    },
  });

  const productosEnvio = cart.map((item) => ({
    largo: item.subcategoria.toLowerCase().includes("remera") ? 32 : 54,
    alto: 5,
    ancho: item.subcategoria.toLowerCase().includes("remera") ? 44 : 42,
    peso: item.subcategoria.toLowerCase().includes("remera") ? 0.3 : 0.5,
    valor: item.price,
    valorContrareembolso: 0,
    cantidad: item.quantity,
    sku: obtenerSkuPorIdYTalle(item._id, item.size) || "",
    descripcionProducto: `${item.title} - ${item.size} `,
  }));

  const datosEnvio = {
    productos: productosEnvio,
    autentificacion: {
      shipper: 3575,
      password: "yFXGj8WIrB8dNLH",
    },
    destinatario: {
      tipoDocumento: "DNI",
      numeroDocumento: globalFormData.shippingDetails.idNumber,
      nombre: `${globalFormData.shippingDetails.firstName} ${globalFormData.shippingDetails.lastName}`,
      email: [globalFormData.shippingDetails.email],
      telefono: globalFormData.shippingDetails.mobile,
      celular: globalFormData.shippingDetails.mobile,
    },
    autorizado: [
      {
        tipoDocumento: "DNI",
        numeroDocumento: globalFormData.shippingDetails.idNumber,
        nombre: `${globalFormData.shippingDetails.firstName} ${globalFormData.shippingDetails.lastName}`,
        email: [globalFormData.shippingDetails.email],
        telefono: globalFormData.shippingDetails.mobile,
        celular: globalFormData.shippingDetails.mobile,
      },
    ],
    domicilio: {
      direccion: globalFormData.shippingDetails.address,
      altura: globalFormData.shippingDetails.addressNumber,
      piso: globalFormData.shippingDetails.apartment,
      departamento: globalFormData.shippingDetails.apartment,
      codigoPostal: globalFormData.shippingDetails.postalCode,
      localidad: globalFormData.shippingDetails.localidad,
      provincia: globalFormData.shippingDetails.provincia,
      latitud: 0,
      longitud: 0,
      telefono: [globalFormData.shippingDetails.mobile],
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
    observaciones: [globalFormData.shippingDetails.deliveryNote],
  };

  const updateFormData = (newData, section) => {
    setGlobalFormData((prevData) => ({
      ...prevData,
      [section]: { ...prevData[section], ...newData },
    }));
  };

  const resetFormData = () => {
    setGlobalFormData({
      shippingDetails: {
        firstName: "",
        lastName: "",
        idNumber: "",
        email: "",
        address: "",
        addressNumber: "",
        apartment: "",
        city: "",
        provincia: "",
        mobile: "",
        postalCode: "",
        deliveryNote: "",
      },
      paymentDetails: {
        // Restablece a los valores iniciales
        cardNumber: "",
        cardExpirationDate: "",
        cardCVV: "",
        cardHolderName: "",
      },
    });
  };

  const calculateTotalWithDiscount = (total, discountObjet) => {
    if (!discountObjet) return total; // Si no hay descuento, retorna el total original
    const { isPercentaje, valor } = discountObjet;

    if (isPercentaje) {
      return total * (1 - valor / 100);
    } else {
      return total - valor;
    }
  };
  const totalConDescuento = calculateTotalWithDiscount(
    total,
    globalFormData.paymentDetails.discountCode
  );

  const getPayment = async (token) => {
    const apikey = "ba0fb5b8bed24975af3ef167e1dcae71";
    // const apikey = "rfZTGgNW83rkKS7HcKDy2YQruDzXEq52";
    const amountToPay =
      globalFormData.paymentDetails.discountCode &&
      Object.keys(globalFormData.paymentDetails.discountCode).length > 0
        ? parseInt(totalConDescuento * 100) // Asegúrate de que totalConDescuento esté en unidades antes de multiplicar por 100
        : parseInt(globalFormData.paymentDetails.totalPesos); // Asumiendo que totalPesos ya está en centavos

    const datos = {
      customer: {
        id: `${globalFormData.shippingDetails.firstName} ${globalFormData.shippingDetails.lastName}`,
        email: globalFormData.shippingDetails.email,
      },
      user_id: "customer",
      site_transaction_id: uuidv4(),
      token: token,
      payment_method_id: globalFormData.paymentDetails.tarjetaSeleccionada,
      bin: "450799",
      // amount: 2900,
      amount: parseInt(amountToPay),
      currency: "ARS",
      site_id: "00270150",
      establishment_name: "Tienda Onfit",
      installments: globalFormData.paymentDetails.cuotas,
      description: "pago Onfit",
      payment_type: "single",
      sub_payments: [],
    };
    try {
      const data = await axios.post(
        "https://ventasonline.payway.com.ar/api/v2/payments",
        datos,
        {
          headers: {
            "Content-Type": "application/json",
            apikey: apikey,
          },
        }
      );

      if (data.data.status === "approved") {
        try {
          await createOrder(data.data.token, data.data.site_transaction_id);
          console.log("pago aprobado");

          const discountCode = globalFormData.paymentDetails.discountCode;
          if (discountCode && discountCode._id) {
            try {
              await axios.put(`/api/discount?_id=${discountCode._id}`);
              console.log("Código de descuento actualizado correctamente.");
            } catch (error) {
              console.error(
                "Error al actualizar el código de descuento:",
                error
              );
            }
          }
        } catch (error) {
          console.error(
            "Error procesando el pago o la creación de la orden:",
            error
          );
        }
      }

      data.data.status == "approved" &&
        gsap.to(".isPaid", {
          opacity: 1,
          ease: Power1.easeIn,
        });

      data.data.status == "approved" &&
        setTimeout(() => {
          gsap.to(".isPaid", {
            opacity: 0,
            ease: Power1.easeIn,
          });
          gsap.to(".isPaid", {
            delay: 0.3,
          });
        }, 10000);
    } catch (err) {
      console.log(err);

      gsap.to(".isError", {
        opacity: 1,
        ease: Power1.easeIn,
      });
      setTimeout(() => {
        gsap.to(".isError", {
          opacity: 0,
          ease: Power1.easeIn,
        });
      }, 10000);
    }
  };

  const createOrder = async (token, transactionId) => {
    try {
      const createOrder_ = await axios.post("/api/orders", {
        orderItems: cart,
        numberOfItems: numberOfItems,
        total: total,
        transactionId: transactionId,
        token: token,
        titular: `${globalFormData.shippingDetails.firstName} ${globalFormData.shippingDetails.lastName}`,
        email: globalFormData.shippingDetails.email,
        address: globalFormData.shippingDetails.address,
        numberOfAddress: globalFormData.shippingDetails.addressNumber,
        localidad: globalFormData.shippingDetails.localidad,
        piso: globalFormData.shippingDetails.piso,
        ciudad: globalFormData.shippingDetails.city,
        provincia: globalFormData.shippingDetails.provincia,
        phone: globalFormData.shippingDetails.mobile,
        dniTitular: `${globalFormData.paymentDetails.numeroIdentificacion}`,
        postalCode: globalFormData.shippingDetails.postalCode,
        discountPrice: totalConDescuento,
        cuotas: `${globalFormData.paymentDetails.cuotas}`,
        discountCode: globalFormData.paymentDetails.discountCode
          ? globalFormData.paymentDetails.discountCode
          : "",
      });

      const stockUpdatePromises = cart.map((item) =>
        axios.put("/api/product", {
          _id: item._id,
          nombre: item.size.toLowerCase(),
          stock: item.quantity,
        })
      );

      await Promise.all(stockUpdatePromises);

      createOrder_.data && setIdOrder(createOrder_.data._id);
      const cargaCliente = await axios.post("/api/cargaclients", datosEnvio);
      cargaCliente.data && console.log("cliente cargado");

      const response = await axios.put(
        `/api/orders?_id=${createOrder_.data._id}`,
        {
          codGestion: cargaCliente.data.codGestion,
        }
      );
      response && push(`/orders/${createOrder_.data._id}`);
    } catch (err) {
      console.log(err);
    }
  };

  const generarToken = async () => {
    try {
      const apiKey = "16e8508ea61d4c4d8093f16d8ee9a3c2"; // Reemplaza TU_API_KEY_AQUI con tu apiKey real
      // const apiKey = "vjzIsMxW2Yd43QoBP93SdmMzJMBbHXoS"; // Reemplaza TU_API_KEY_AQUI con tu apiKey real
      const response = await axios.post(
        "https://ventasonline.payway.com.ar/api/v2/tokens",
        {
          card_number: globalFormData.paymentDetails.numeroTarjeta,
          card_expiration_month: globalFormData.paymentDetails.mesExpiracion,
          card_expiration_year: globalFormData.paymentDetails.anioExpiracion,
          security_code: globalFormData.paymentDetails.codigoSeguridad,
          card_holder_name: globalFormData.paymentDetails.nombreTitular,
          card_holder_identification: {
            type: "dni",
            number: globalFormData.paymentDetails.numeroIdentificacion,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            apikey: apiKey, // Usa la apiKey como un encabezado personalizado
          },
        }
      );
      response.data && getPayment(response.data.id);
      response.data && console.log("token generado");
    } catch (error) {
      console.error(error);

      gsap.to(".isError", {
        opacity: 1,
        ease: Power1.easeIn,
      });
      setTimeout(() => {
        gsap.to(".isError", {
          opacity: 0,
          ease: Power1.easeIn,
        });
      }, 10000);
    }
  };

  const submitGlobalForm = async () => {
    try {
      generarToken();
    } catch (err) {
      console.log(err);
    }
  };

  return { globalFormData, updateFormData, resetFormData, submitGlobalForm };
}

export default useGlobalForm;
