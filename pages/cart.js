import Navigation from '@/components/navigation/navigation';
import { useCart } from '@/hooks/useCart';
import { decreaseQuantityOfProductInCart, getCartTotal, increaseQuantityOfProductInCart, removeProductFromCart } from '@/utils/cartManager';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

import styles from '../styles/Cart.module.css'



const Cart = () => {


    const { products, gotoCart } = useCart();
    const router = useRouter();

    const [isNavOpen, setIsNavOpen] = useState(false);



    if (isNavOpen) {
        return (
            <Navigation
                setIsNavOpen={setIsNavOpen}
            />
        )
    }


    return (
        <div className={styles.page}>

            <div className={styles.topBar}>
                <div className={styles.hamburger} onClick={() => { setIsNavOpen(true) }} />
                <div className={styles.pageTitle}> Cart </div>
                <div className={styles.cart} onClick={gotoCart} />
            </div>

            <div className={styles.products}>
                {
                    products.length === 0 &&
                    <div className={styles.emptyCart}>
                        <div className={styles.emptyCartText}>Your cart is empty</div>
                    </div>
                }
                {
                    products.map((product) => (
                        <div className={styles.product} key={product.id}>
                            <div className={styles.removeProductFromCart} onClick={() => { removeProductFromCart(product); router.reload() }} />

                            <div className={styles.productInformation}>
                                <div className={styles.productImage}>
                                    <img src={product.image} alt={product.name} />
                                </div>
                                <div className={styles.productName}>{product.name}</div>
                                <div className={styles.productPrice}>${product.price}</div>
                                <div> x {product.quantity}</div>
                            </div>
                            <div className={styles.productActionButtons}>
                                <div className={styles.removeProduct} onClick={() => { decreaseQuantityOfProductInCart(product); router.reload() }} />
                                <div className={styles.productQuantity}>${product.quantity}</div>
                                <div className={styles.addProduct} onClick={() => { increaseQuantityOfProductInCart(product); router.reload() }} />
                            </div>
                        </div>
                    ))
                }
            </div>


            {
                products.length > 0 &&
                <div className={styles.checkout}>
                    <div className={styles.checkoutButtonTotal}>{`Total: ${getCartTotal()}`} </div>
                    <div className={styles.checkoutButton}>Checkout  </div>
                </div>
            }

        </div>
    )
}

export default Cart