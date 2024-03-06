import { useEffect, useState } from "react";
import axios from "axios";

export function useCodes() {
  const [codes, setCodes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getProductsFromAPI() {
      try {

        const response = await axios.get('/api/discount');
        const codes = response.data;

        setCodes(codes);

        setIsLoading(false); // Indicar que la carga ha finalizado
      } catch (error) {
        console.error("Error fetching products:", error);
        setIsLoading(false); // Indicar que la carga ha finalizado
      }
    }

    getProductsFromAPI();
  }, []); // Dependencia para que el hook se ejecute cuando cambie el filtro

  return { codes, isLoading };
}
