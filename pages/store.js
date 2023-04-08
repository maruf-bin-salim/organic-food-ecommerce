import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import styles from '../styles/Store.module.css'

import Navigation from '@/components/navigation/navigation'
import { useProducts } from '@/hooks/useProducts';
import FilterBar from '@/components/FilterBar/filterBar';
import filter_types from '@/data/store_filter_types';
import { useCart } from '@/hooks/useCart';
import { decreaseQuantityOfProductInCart, increaseQuantityOfProductInCart, isProductInCart, removeProductFromCart } from '@/utils/cartManager';
import AuthUI from '@/components/AuthUI/AuthUI';
import { addWishlistedBy, removeWishlistedBy } from '@/database/database_functions';


const Store = ({ user }) => {
    
    const { products } = useProducts();
    const { gotoCart } = useCart();

    const router = useRouter();

    const [isNavOpen, setIsNavOpen] = useState(false);
    const [filter, setFilter] = useState(filter_types.all);
    const [filteredProducts, setFilteredProducts] = useState([]);


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





    const filterProducts = (products, filter) => {
        return products.filter((product) => {
            return filter === filter_types.all || product.category.toLowerCase() === filter.toLowerCase();
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
            <div className={styles.topBar}>
                <div className={styles.hamburger} onClick={() => { setIsNavOpen(true) }} />
                <div className={styles.pageTitle}> Store </div>
                <div className={styles.cart} onClick={gotoCart} />
            </div>
            <FilterBar filter={filter} setFilter={setFilter} />

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
        <AuthUI InnerComponent={Store} />
    )
}
