import { getOrdersByUser } from "@/database/database_functions"
import { useEffect, useState } from "react"


function useOrders(userID) {
    const [fetchedOrders, setOrders] = useState([])
    

    useEffect(() => {
        const fetchOrders = async () => {
            let orders = await getOrdersByUser(userID);
            setOrders(orders);
        }
        fetchOrders()
    }, [userID])

    return fetchedOrders;
}
export default useOrders;