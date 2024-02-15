import { CartContext } from "@/context/cart/CartContext";
import axios from "axios";
import gsap, { Power1 } from "gsap";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

function useGlobalForm() {
  const trackId = uuidv4();
  const { cart, numberOfItems, total } = useContext(CartContext);
  const { push } = useRouter();
  const [_idOrder, setIdOrder] = useState();
  const [globalFormData, setGlobalFormData] = useState({
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
    sku: item.sku || "",
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
      localidad: globalFormData.shippingDetails.city,
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

  const getPayment = async (token) => {
    const apikey = "ba0fb5b8bed24975af3ef167e1dcae71";
    // const apikey = "rfZTGgNW83rkKS7HcKDy2YQruDzXEq52";

    const datos = {
      customer: {
        id: "customer01",
        email: "MiPago@gmail.com",
      },
      user_id: "customer",
      site_transaction_id: uuidv4(),
      token: token,
      payment_method_id: parseInt(
        globalFormData.paymentDetails.tarjetaSeleccionada
      ),
      bin: "450799",
      // amount: 2900,
      amount: parseInt(globalFormData.paymentDetails.totalPesos),
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
      data.data.status == "approved" &&
        createOrder(data.data.token, data.data.site_transaction_id);

      data.data.status == "approved" && console.log("pago aprobado");

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
      const [mesExpiracion, anioExpiracion] =
        globalFormData.paymentDetails.fechaExpiracion.split("/");

      const apiKey = "16e8508ea61d4c4d8093f16d8ee9a3c2"; // Reemplaza TU_API_KEY_AQUI con tu apiKey real
      // const apiKey = "vjzIsMxW2Yd43QoBP93SdmMzJMBbHXoS"; // Reemplaza TU_API_KEY_AQUI con tu apiKey real
      const response = await axios.post(
        "https://ventasonline.payway.com.ar/api/v2/tokens",
        {
          card_number: globalFormData.paymentDetails.numeroTarjeta,
          card_expiration_month: mesExpiracion,
          card_expiration_year: anioExpiracion,
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
      // createOrder('asda','asdas')
      // console.log(globalFormData);
    } catch (err) {}
  };

  return { globalFormData, updateFormData, resetFormData, submitGlobalForm };
}

export default useGlobalForm;
