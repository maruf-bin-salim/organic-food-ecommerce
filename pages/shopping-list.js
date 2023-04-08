import React, { useState } from 'react'
import { useRouter } from 'next/router';

import styles from '../styles/ShoppingList.module.css'

import Navigation from '@/components/navigation/navigation';
import { useShoppingListProducts } from '@/hooks/useShoppingListProducts';
import { useCart } from '@/hooks/useCart';
import { decreaseQuantityOfProductInCart, increaseQuantityOfProductInCart, isProductInCart, removeProductFromCart } from '@/utils/cartManager';
import AuthUI from '@/components/AuthUI/AuthUI';
import { addWishlistedBy, removeWishlistedBy } from '@/database/database_functions';


const ShoppingList = ({ user }) => {


  const { products } = useShoppingListProducts(user.uid);

  const { gotoCart } = useCart();
  const router = useRouter();

  const [isNavOpen, setIsNavOpen] = useState(false);

  async function handleRemoveWishlistClick(product) {
    if (user) {
      await removeWishlistedBy(product.id, user.uid);
      router.reload();
    }
  }


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

      {
        products.length === 0 &&
        <div className={styles.emptyCart}>
          <div className={styles.emptyCartText}>Your shopping list is empty</div>
        </div>
      }
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
              <div className={styles.removeFromList}
                onClick={async () => { await handleRemoveWishlistClick(product) }}
              />
            </div>
          ))
        }
      </div>

    </div>
  )
}


export default function Page() {
  return (
    <AuthUI InnerComponent={ShoppingList} />
  )
}