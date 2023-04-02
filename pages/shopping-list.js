import React, { useState } from 'react'
import { useRouter } from 'next/router';

import styles from '../styles/ShoppingList.module.css'

import Navigation from '@/components/navigation/navigation';
import { useShoppingListProducts } from '@/hooks/useShoppingListProducts';
import { useCart } from '@/hooks/useCart';
import { decreaseQuantityOfProductInCart, increaseQuantityOfProductInCart, isProductInCart, removeProductFromCart } from '@/utils/cartManager';

const ShoppingList = () => {


  const { products } = useShoppingListProducts();
  const { gotoCart } = useCart();
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
        <div className={styles.pageTitle}> Shopping List</div>
        <div className={styles.cart} onClick={gotoCart} />
      </div>

      <div className={styles.products}>
        {
          products.map((product) => (
            <div className={styles.product} key={product.id}>
              <div className={styles.productImage}>
                <img src={product.image} alt={product.name} />
              </div>
              <div className={styles.productName}>{product.name}</div>
              <div className={styles.productPrice}>${product.price}</div>
              {
                
                isProductInCart(product) &&
                <div className={styles.removeProduct} onClick={() => { removeProductFromCart(product); router.reload() }} />
              }
              {

                !isProductInCart(product) &&
                <div className={styles.addProduct} onClick={() => { increaseQuantityOfProductInCart(product); router.reload() }} />
              }
              <div className={styles.removeFromList} />
            </div>
          ))
        }
      </div>

    </div>
  )
}

export default ShoppingList