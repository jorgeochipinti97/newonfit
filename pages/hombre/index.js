import { ProductFilterPage } from "@/components/Products/ProductFilterPage/ProductFilterPage";
import { ShopLayout } from "@/components/layout/shopLayout";
import React from "react";


const HombresPage = () => {
 
  return (
    <ShopLayout title="Onfit - Hombre" pageDescription="">
      <ProductFilterPage />
    </ShopLayout>
  );
};

export default HombresPage;
