import { useProducts } from '@/hooks/useProducts'
import { increaseQuantityOfProductInCart, isProductInCart, removeProductFromCart } from '@/utils/cartManager';
import { useRouter } from 'next/router';
import React from 'react'
import styles from "../../styles/Product.module.css";



const Product = () => {


    const { products } = useProducts();

    const router = useRouter();
    const { id } = router.query;
    const product = products.find((product) => product.id === id);

    if (!product) return (
        <div className={styles.loading}>
            loading ...
        </div>
    )

    return (
        <div className={styles.page}>

            <div className={styles.topBar}>
                <div className={styles.backButton} onClick={() => { router.push('/') }} />
                <div className={styles.cart} onClick={() => { router.push('/cart') }} />
            </div>

            <div className={styles.main}>
                <img
                    className={styles.productImage}
                    src={product.image} alt={product.name}
                />
                <div className={styles.productInformation}>
                    <h1>{product.name} ({product.category})</h1>
                    <p>{product.price} OMR</p>
                </div>
                <p
                    className={styles.description}
                >{product.description}</p>

                {
                    isProductInCart(product) &&
                    <div onClick={() => { removeProductFromCart(product); router.reload() }}
                        className={styles.removeProductFromCart}
                    >
                        Remove From Cart
                    </div>
                }
                {
                    !isProductInCart(product) &&
                    <div onClick={() => { increaseQuantityOfProductInCart(product); router.reload() }}
                        className={styles.addProductToCart}
                    >
                        Add To Cart
                    </div>
                }

            </div>



        </div>
    )
}

export default Product