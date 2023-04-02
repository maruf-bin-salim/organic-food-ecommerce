import { useEffect, useState } from "react";
// write a simple hook that returns a list of products

export const useProducts = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
    }, []);
    return products;
}
