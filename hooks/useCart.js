import products from "@/data/products";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// write a simple hook that returns a list of products


export const useCart = () => {
    const [loadedProducts, setProducts] = useState([]);
    const router = useRouter();

    const gotoCartPage = () => {
        router.push("/cart");
    };

    useEffect(() => {
        setProducts(products)
    }, []);
    
    return {
        products: loadedProducts,
        gotoCart: gotoCartPage
    };
}
