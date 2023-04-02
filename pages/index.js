import { useState } from "react";

import styles from "../styles/Home.module.css";
import Navigation from "@/components/navigation/navigation";
import { useShoppingListProducts } from "@/hooks/useShoppingListProducts";

export default function Home() {

  const { products } = useShoppingListProducts();
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
      <div className={styles.main}>
        <div className={styles.topBar}>
          <div className={styles.hamburger} onClick={() => { setIsNavOpen(true) }} />
          <div className={styles.searchBarContainer}>
            <input className={styles.searchBar} placeholder="Search" />
          </div>
          <div className={styles.search} />
        </div>
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
              <div className={styles.addProduct} />
              <div className={styles.removeFromList} />
            </div>
          ))
        }
      </div>

    </div>
  )
}
