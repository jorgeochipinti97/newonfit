import { ProductFilterPage } from '@/components/Products/ProductFilterPage/ProductFilterPage'
import { ShopLayout } from '@/components/layout/shopLayout'
import React from 'react'

const index = () => {
    return (
        
        <ShopLayout title="Onfit - Indumentaria" pageDescription="">
           <ProductFilterPage />
         </ShopLayout>  
     )
}

export default index