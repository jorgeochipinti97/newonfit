import { useEffect, useState } from "react";
import axios from "axios";

export function useProduct(filter) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getProductsFromAPI() {
      try {
        let url = "/api/product"; //
        const response = await axios.get(url);
        const products = response.data;
        console.log(response);
        const filterProducts =
          filter && products.filter((e) => e.slug.includes(filter));
        setProducts(filter ? filterProducts : products);
        setIsLoading(false); // Indicar que la carga ha finalizado
      } catch (error) {
        console.error("Error fetching products:", error);
        setIsLoading(false); // Indicar que la carga ha finalizado
      }
    }

    getProductsFromAPI();
  }, [filter]); // Dependencia para que el hook se ejecute cuando cambie el filtro

  return { products, isLoading };
}
