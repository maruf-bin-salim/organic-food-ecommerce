import { useEffect, useState } from "react";

import styles from "../styles/Home.module.css";
import { increaseQuantityOfProductInCart, isProductInCart, removeProductFromCart } from "@/utils/cartManager";
import { useRouter } from "next/router";
import { useProducts } from "@/hooks/useProducts";
import AuthUI from "@/components/AuthUI/AuthUI";
import { addWishlistedBy, removeWishlistedBy } from "@/database/database_functions";



const SUPPORTED_LANGUAGES = {
  en: "English",
  ar: "العربية",
};


function Home({ user }) {

  const router = useRouter();
  const { products } = useProducts();
  const [filter, setFilter] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(SUPPORTED_LANGUAGES.en);

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


  async function handleWishlistClick(product) {
    if (user) {
      await addWishlistedBy(product.id, user.uid);
      router.reload();
    }
  }

  async function handleRemoveWishlistClick(product) {
    if (user) {
      await removeWishlistedBy(product.id, user.uid);
      router.reload();
    }
  }











  return (
    <div className={styles.page}>
      <div className={styles.main}>
        <div
          className={styles.infoBar}>
          <div className={styles.languageSelector}>

            <div className={styles.languageSelectorOption}>
              <div className={styles.selectedIcon} />
              <p>{SUPPORTED_LANGUAGES.en}</p>
            </div>

            <div className={styles.languageSelectorOption}>
              <div className={styles.selectedIcon} />
              <p>{SUPPORTED_LANGUAGES.ar}</p>
            </div>


          </div>

          <div className={styles.user}>
            <div className={styles.userImage} />
            <p>
              {user?.email}
            </p>
          </div>
        </div>
        <div className={styles.topBar}>
          <div>
            something
          </div>
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

              {
                !product.wishlistedBy?.includes(user?.uid) &&
                <div className={styles.wishlistProduct}
                  onClick={async () => { await handleWishlistClick(product) }}
                />
              }

              {
                product.wishlistedBy?.includes(user?.uid) &&
                <div className={styles.removeWishlistProduct}
                  onClick={async () => { await handleRemoveWishlistClick(product) }}
                />
              }




            </div>
          ))
        }
      </div>

    </div>
  )
}


export default function Page() {
  return (
    <AuthUI InnerComponent={Home} />
  )
}