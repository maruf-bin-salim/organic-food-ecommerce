import React from 'react'
import styles from '../styles/ShoppingList.module.css'

const ShoppingList = () => {
  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <div>
          Hamburger
        </div>
        <div>
          Shopping List
        </div>
        <div>
          cart
        </div>
      </div>
    </div>
  )
}

export default ShoppingList