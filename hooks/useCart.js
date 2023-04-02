import products from "@/data/products";
import { getProductsFromCart } from "@/utils/cartManager";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// write a simple hook that returns a list of products

import styles from '../styles/ShoppingList.module.css'



export const useCart = () => {
    const [loadedProducts, setProducts] = useState([]);
    const router = useRouter();

    const gotoCartPage = () => {
        router.push("/cart");
    };

    useEffect(() => {
        let cartProducts = getProductsFromCart();
        setProducts(cartProducts)
    }, []);

    return {
        products: loadedProducts,
        gotoCart: gotoCartPage
    };
}
