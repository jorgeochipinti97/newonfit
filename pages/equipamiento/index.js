import React from 'react'
import { ProductFilterPage } from '@/components/Products/ProductFilterPage/ProductFilterPage'
import { ShopLayout } from '@/components/layout/shopLayout'


const EquipamientoPage = () => {
  return (
    
     <ShopLayout title="Onfit" pageDescription="">
        <ProductFilterPage />
      </ShopLayout>  
  )
}

export default EquipamientoPage