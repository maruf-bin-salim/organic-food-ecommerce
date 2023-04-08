import products from "@/data/products";
import { getWishlistedProducts } from "@/database/database_functions";
import { useEffect, useState } from "react";
// write a simple hook that returns a list of products


export const useShoppingListProducts = (userID) => {
    const [loadedProducts, setProducts] = useState([]);
    useEffect(() => {

        let fetchAllProducts = async () => {
            if(!userID) return;
            const products = await getWishlistedProducts(userID);
            setProducts(products);
        }
        fetchAllProducts();
    }, [userID]);
    return { products: loadedProducts };
}
