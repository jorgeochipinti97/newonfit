import { ProductFilterPage } from '@/components/Products/ProductFilterPage/ProductFilterPage'
import { ShopLayout } from '@/components/layout/shopLayout'
import React from 'react'

const AccesoriosPage = () => {
  return (
    <ShopLayout title="Onfit - Accesorios" pageDescription="">
    <ProductFilterPage />
  </ShopLayout>  )
}

export default AccesoriosPage