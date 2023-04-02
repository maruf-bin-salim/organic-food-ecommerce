import React from 'react'
import styles from '../styles/ShoppingList.module.css'

import { useProducts } from '@/hooks/useProducts';

const ShoppingList = () => {

  const { products } = useProducts();
  return (
    <div className={styles.page}>

      <div className={styles.topBar}>
        <div className={styles.hamburger} />
        <div className={styles.pageTitle}> Shopping List</div>
        <div className={styles.cart} />
      </div>


      {
        products.map((product) => (
          <div className={styles.product} key={product.id}>
            <div className={styles.productImage}>
              <img src={product.image} alt={product.name} />
            </div>
            <div className={styles.productName}>{product.name}</div>
            <div className={styles.productPrice}>${product.price}</div>
          </div>
        ))
      }



    </div>
  )
}

export default ShoppingList