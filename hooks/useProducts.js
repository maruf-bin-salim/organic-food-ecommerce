import products from "@/data/products";
import { useEffect, useState } from "react";
// write a simple hook that returns a list of products


export const useProducts = () => {
    const [loadedProducts, setProducts] = useState([]);
    useEffect(() => {
        setProducts(products)
    }, []);
    return loadedProducts;
}
