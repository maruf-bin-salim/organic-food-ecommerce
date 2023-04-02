import React from 'react'
import styles from '../styles/ShoppingList.module.css'

const ShoppingList = () => {
  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <div className={styles.hamburger} />
        <div>
          Shopping List
        </div>
        <div className={styles.cart} />
      </div>
    </div>
  )
}

export default ShoppingList