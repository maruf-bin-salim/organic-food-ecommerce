import { useEffect, useState } from "react"

const { orders } = require("@/data/orders")

function useOrders() {
    const [fetchedOrders, setOrders] = useState([])
    

    useEffect(() => {
        const fetchOrders = async () => {

            setOrders(orders)
        }
        fetchOrders()
    }, [])

    return fetchedOrders;
}
export default useOrders;