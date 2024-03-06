
import { ProductFilterPage } from '@/components/Products/ProductFilterPage/ProductFilterPage'
import { ShopLayout } from '@/components/layout/shopLayout'
import React from 'react'


const SuplementosPage = () => {
  return (
     <ShopLayout title="Onfit - Mujer" pageDescription="">
        <ProductFilterPage />
      </ShopLayout>  
  )
}

export default SuplementosPage