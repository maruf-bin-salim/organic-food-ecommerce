import useOrder from '@/hooks/useOrder';
import { Router, useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import styles from "../../styles/Order.module.css";

let PAGE_TYPE = {
    ITEMS: 'items',
    TRACK: 'track',
    DETAILS: 'details',
}


// write a function that takes in an array of product and a total price
// this function returns a table of products and their prices and their quantities
// and the total price at the bottom

function ProductTable({ products, totalPrice }) {
    if (!products) return null;
    return (
        <table>
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product) => {
                    return (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.quantity}</td>
                        </tr>
                    )
                })}
                <tr>
                    <td>Total</td>
                    <td>{totalPrice}</td>
                </tr>
            </tbody>
        </table>

    )
}

const TopBar = ({ orderID }) => {
    const router = useRouter();
    return (
        <div className={styles.topBar}>
            <div className={styles.backButton} onClick={() => { router.push('/orders') }} />
            <div className={styles.pageTitle}> # Order {orderID} </div>
        </div>
    )
}

const Items = () => {
    return (
        <div>Items</div>
    )
}

const Track = () => {
    return (
        <div>Track</div>
    )
}

const Details = () => {
    return (
        <div>Details</div>
    )
}


const Order = () => {

    const [pageType, setPageType] = useState(PAGE_TYPE.ITEMS);

    const router = useRouter();
    const [orderID, setOrderID] = useState(null);

    useEffect(() => {
        if (router.query.orderID) {
            setOrderID(router.query.orderID);
        }
    }, [router.query]);


    const order = useOrder(orderID);



    if (pageType === PAGE_TYPE.ITEMS) {
        return (
            <div className={styles.page}>
                <TopBar orderID={orderID} />
                <Items />
                <ProductTable products={order?.cart?.products} totalPrice={order?.cart?.total} />
            </div>
        )
    }

    else if (pageType === PAGE_TYPE.TRACK) {
        return (
            <div className={styles.page}>
                <TopBar orderID={orderID} />
                <Track />
            </div>


        )
    }

    else if (pageType === PAGE_TYPE.DETAILS) {
        return (
            <div className={styles.page}>
                <TopBar orderID={orderID} />
                <Details />
            </div>
        )
    }

    return null;
}

export default Order