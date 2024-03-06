import React from 'react'
import { ProductFilterPage } from '@/components/Products/ProductFilterPage/ProductFilterPage'
import { ShopLayout } from '@/components/layout/shopLayout'


const MujeresPage = () => {
    return (
        
     <ShopLayout title="Onfit - Mujer" pageDescription="">
        <ProductFilterPage />
      </ShopLayout>  
  )
}

export default MujeresPage