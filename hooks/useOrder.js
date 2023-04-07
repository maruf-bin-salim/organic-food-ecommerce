import { useEffect, useState } from "react"

const { orders } = require("@/data/orders")

function useOrder(orderID) {
    const [fetchedOrder, setOrder] = useState(null)


    useEffect(() => {
        const fetchOrder = async () => {
            let filteredOrders = orders.filter(order => order.orderID === orderID);
            if (filteredOrders.length === 0) {
                setOrder(null);
            }
            else {
                setOrder(filteredOrders[0]);
            }
        }
        fetchOrder()
    }, [orderID])

    return fetchedOrder;
}
export default useOrder;