import { getAllOrders } from "@/database/database_functions"
import { useEffect, useState } from "react"


function useAllOrders(userID) {
    const [fetchedOrders, setOrders] = useState([])
    

    useEffect(() => {
        const fetchOrders = async () => {
            let orders = await getAllOrders(userID);
            setOrders(orders);
        }
        fetchOrders()
    }, [userID])

    return fetchedOrders;
}
export default useAllOrders;