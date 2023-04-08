import products from "@/data/products";
import { useEffect, useState } from "react";
import { upsertProduct, getAllProducts } from "@/database/database_functions";


// write a simple hook that returns a list of products
export const useProducts = () => {
    const [loadedProducts, setProducts] = useState([]);



    useEffect(() => {
        let fetchAllProducts = async () => {
            const products = await getAllProducts();
            setProducts(products);
        }
        fetchAllProducts();
    }, []);
    return { products: loadedProducts };
}


