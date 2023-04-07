import React, { useState } from 'react'
import useOrders from '@/hooks/useOrders';
import styles from '../styles/Orders.module.css'
import Navigation from '@/components/navigation/navigation';
import { useCart } from '@/hooks/useCart';


const Orders = () => {

    const [isNavOpen, setIsNavOpen] = useState(false);

    let orders = useOrders();
    let { gotoCart } = useCart();





    if (isNavOpen) {
        return (
            <Navigation
                setIsNavOpen={setIsNavOpen}
            />
        )
    }

    function getStyle(order) {
        if (order.orderStatus === "ongoing") {
            return styles.pending
        }
        if (order.orderStatus === "delivered") {
            return styles.delivered
        }
        if (order.orderStatus === "cancelled") {
            return styles.cancelled
        }
    }


    return (
        <div className={styles.page}>

            <div className={styles.topBar}>
                <div className={styles.hamburger} onClick={() => { setIsNavOpen(true) }} />
                <div className={styles.pageTitle}> Orders </div>
                <div className={styles.cart} onClick={gotoCart} />
            </div>
            <div className={styles.orders}>
                {
                    orders.map((order, index) => {

                        return (
                            <div key={index} className={styles.order}>
                                <div className={styles.orderHeader}>
                                    <div className={styles.orderNumber}>Order #{order.orderID}</div>
                                    <div className={getStyle(order)}>{order.orderStatus}</div>
                                </div>
                                <div className={styles.orderDate}>{`Date : ${order.date}$`}</div>
                                <div className={styles.orderAddress}>{`Address: ${order.location.address}`}</div>
                                <div className={styles.orderTotal}>{`Total : ${order.cart.total}$`}</div>

                                <div className={styles.goToOrder}>{"Go To Order"}</div>
                            </div>
                        )

                    })
                }
            </div>

        </div>
    )
}

export default Orders