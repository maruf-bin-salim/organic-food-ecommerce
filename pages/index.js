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

function HorizontalNavBar({ selectedLanguage }) {

  const router = useRouter();

  return (
    <div className={styles.horizontalNavBar}>

      <div className={styles.navOption}
        onClick={() => { router.push('/') }}>
        {
          selectedLanguage === SUPPORTED_LANGUAGES.en ? "my cart" : "2"
        }
      </div>

      <div className={styles.navOption}
        onClick={() => { router.push('/') }}>
        {
          selectedLanguage === SUPPORTED_LANGUAGES.en ? "shopping list" : "2"
        }
      </div>


      <div className={styles.navOption}
        onClick={() => { router.push('/') }}>
        {
          selectedLanguage === SUPPORTED_LANGUAGES.en ? "saved list" : "2"
        }
      </div>


      <div className={styles.navOption}
        onClick={() => { router.push('/') }}>
        {
          selectedLanguage === SUPPORTED_LANGUAGES.en ? "offers" : "2"
        }
      </div>

      <div className={styles.navOption}
        onClick={() => { router.push('/') }}>
        {
          selectedLanguage === SUPPORTED_LANGUAGES.en ? "fruits" : "2"
        }
      </div>

      <div className={styles.navOption}
        onClick={() => { router.push('/') }}>
        {
          selectedLanguage === SUPPORTED_LANGUAGES.en ? "vegetables" : "2"
        }
      </div>

      <div className={styles.navOption}
        onClick={() => { router.push('/') }}>
        {
          selectedLanguage === SUPPORTED_LANGUAGES.en ? "all products" : "2"
        }
      </div>

    </div>
  )
}


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

            <div className={styles.languageSelectorOption}
              onClick={() => { setSelectedLanguage(SUPPORTED_LANGUAGES.en) }}>

              {
                selectedLanguage === SUPPORTED_LANGUAGES.en &&
                <div className={styles.selectedIcon} />
              }
              <p>{SUPPORTED_LANGUAGES.en}</p>
            </div>

            <div className={styles.languageSelectorOption}
              onClick={() => { setSelectedLanguage(SUPPORTED_LANGUAGES.ar) }}>
              {
                selectedLanguage === SUPPORTED_LANGUAGES.ar &&
                <div className={styles.selectedIcon} />
              }
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

          <div className={styles.cart} />

          <div className={styles.searchBarContainer}>
            <input className={styles.searchBar} placeholder="Search by name or category"
              onChange={(e) => { setFilter(e.target.value) }}
            />
            <div className={styles.search} />
          </div>


          <div className={styles.logo} />


        </div>


        <HorizontalNavBar selectedLanguage={selectedLanguage} />
      </div>



      <div className={styles.sections}>

        <div className={styles.topSection}>
          <div>
            <div className={styles.topSectionLogo} />
            <h3>
              Organic Shop
            </h3>
            <p>Where you can Buy Health and Stay Healthy</p>
          </div>
        </div>

        <div className={styles.leftSection}>
          <h3>
            Organic Fruits
          </h3>
        </div>

        <div className={styles.rightSection}>
          <h3>
            Organic Vegetables
          </h3>
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



