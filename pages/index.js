import { useEffect, useState } from "react";

import styles from "../styles/Home.module.css";
import { increaseQuantityOfProductInCart, isProductInCart, removeProductFromCart } from "@/utils/cartManager";
import { useRouter } from "next/router";
import { useProducts } from "@/hooks/useProducts";
import AuthUI from "@/components/AuthUI/AuthUI";
import { addWishlistedBy, removeWishlistedBy } from "@/database/database_functions";
import Navigation from "@/components/navigation/navigation";




const SUPPORTED_LANGUAGES = {
  en: "English",
  ar: "العربية",
};

function HorizontalNavBar({ selectedLanguage }) {

  const router = useRouter();


  return (
    <div className={styles.horizontalNavBar}>

      <div className={styles.navOption}
        onClick={() => { router.push('/cart') }}>
        {
          selectedLanguage === SUPPORTED_LANGUAGES.en ? "my cart" : "عربتي"
        }
      </div>

      <div className={styles.navOption}
        onClick={() => { router.push('/orders') }}>
        {
          selectedLanguage === SUPPORTED_LANGUAGES.en ? "shopping list" : "قائمة التسوق"
        }
      </div>


      <div className={styles.navOption}
        onClick={() => { router.push('/saved-list') }}>
        {
          selectedLanguage === SUPPORTED_LANGUAGES.en ? "saved list" : "القائمة المحفوظة"
        }
      </div>


      <div className={styles.navOption}
        onClick={() => { router.push('/') }}>
        {
          selectedLanguage === SUPPORTED_LANGUAGES.en ? "offers" : "عروض"
        }
      </div>

      <div className={styles.navOption}
        onClick={() => { router.push('/store?filter=fruits') }}>
        {
          selectedLanguage === SUPPORTED_LANGUAGES.en ? "fruits" : "الفاكهة"
        }
      </div>

      <div className={styles.navOption}
        onClick={() => { router.push('/store?filter=vegetables') }}>
        {
          selectedLanguage === SUPPORTED_LANGUAGES.en ? "vegetables" : "خضروات"
        }
      </div>

      <div className={styles.navOption}
        onClick={() => { router.push('/store?filter=all') }}>
        {
          selectedLanguage === SUPPORTED_LANGUAGES.en ? "all products" : "جميع المنتجات"
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


  const [isNavOpen, setIsNavOpen] = useState(false);




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
        <div
          className={styles.infoBar}>
          {/* <div className={styles.hamburger} onClick={() => { setIsNavOpen(true) }} /> */}



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

        <div className={styles.topSection} onClick={() => { router.push('/store?filter=all') }}>
          <div>
            <div className={styles.topSectionLogo} />
            <h3>
              Organic Shop
            </h3>
            <p>Where you can Buy Health and Stay Healthy</p>
          </div>
        </div>

        <div className={styles.leftSection} onClick={() => { router.push('/store?filter=fruits') }}>
          <h3>
            Organic Fruits
          </h3>
        </div>

        <div className={styles.rightSection} onClick={() => { router.push('/store?filter=vegetables') }}>
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
              <div className={styles.productName}>{`${product.name} (${product.category?.toLowerCase()})`}</div>
              <div className={styles.productPrice}>{product.price} OMR </div>
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



