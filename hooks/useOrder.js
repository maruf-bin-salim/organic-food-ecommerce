import { getOrder } from "@/database/database_functions"
import { useEffect, useState } from "react"



function useOrder(orderID) {
    const [fetchedOrder, setOrder] = useState([])
    useEffect(() => {
        const fetchOrder = async () => {
            if (!orderID) return;
            const order = await getOrder(orderID)
            setOrder(order);
        }
        fetchOrder()
    }, [orderID])

    return fetchedOrder;
}
export default useOrder;