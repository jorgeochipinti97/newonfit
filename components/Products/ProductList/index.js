


import { useRouter } from 'next/router';
import { Grid } from '@mui/material';
import { ProductCard } from '../ProductCard';


export const ProductList = ({ products,isMobile }) => {

    const { asPath } = useRouter()


    return (
        <>

            <Grid container spacing={1}>


                {
                    products.map(product => (


                        <ProductCard
                        isMobile={isMobile}
                            key={product.slug}
                            product={product}
                        />

                    ))
                }
       

            </Grid>
        </>
    )
}
