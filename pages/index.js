import { useEffect, useState } from "react";

import styles from "../styles/Home.module.css";
import Navigation from "@/components/navigation/navigation";
import { useShoppingListProducts } from "@/hooks/useShoppingListProducts";
import { checkIfProductExists, decreaseQuantityOfProductInCart, increaseQuantityOfProductInCart, isProductInCart, removeProductFromCart } from "@/utils/cartManager";
import { useRouter } from "next/router";

export default function Home() {

  const router = useRouter();

  const { products } = useShoppingListProducts();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);





  const filterProducts = (products, filter) => {
    return products.filter((product) => {
      return !filter || filter === "" ||
        product.name?.toLowerCase().includes(filter.toLowerCase()) ||
        product.category?.toLowerCase().includes(filter.toLowerCase());
    })
  }

  useEffect(() => {
    let filteredProducts = filterProducts(products, filter);
    setFilteredProducts(filteredProducts);
  }, [filter]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);



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
            <input className={styles.searchBar} placeholder="Search by name or category"
              onChange={(e) => { setFilter(e.target.value) }}
            />
          </div>
          <div className={styles.search} />
        </div>
      </div>



      <div className={styles.products}>
        {
          filteredProducts.map((product) => (
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

              <div className={styles.wishlistProduct} />
            </div>
          ))
        }
      </div>

    </div>
  )
}
