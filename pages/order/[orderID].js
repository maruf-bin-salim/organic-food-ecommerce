import AuthUI from '@/components/AuthUI/AuthUI';
import TrackMap from '@/components/TrackMap';
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

const PageTypeSetter = ({ order, pageType, setPageType }) => {
    if (!order) return null;

    function isSelected(thisType) {
        return pageType === thisType ? '4px solid white' : 'none';
    }



    return (


        <div className={styles.setter}>
            <div
                className={styles.type}
                style={{ borderBottom: `${isSelected(PAGE_TYPE.ITEMS)}` }}
                onClick={() => { setPageType(PAGE_TYPE.ITEMS) }}
            >
                Items
            </div>

            <div
                className={styles.type}
                style={{ borderBottom: `${isSelected(PAGE_TYPE.TRACK)}` }}
                onClick={() => { setPageType(PAGE_TYPE.TRACK) }}
            >
                Track
            </div>

            <div
                className={styles.type}
                style={{ borderBottom: `${isSelected(PAGE_TYPE.DETAILS)}` }}
                onClick={() => { setPageType(PAGE_TYPE.DETAILS) }}
            >
                Details
            </div>
        </div>
    )


}
const Items = ({ order }) => {
    return (
        <ProductTable products={order?.cart?.products} totalPrice={order?.cart?.total} />
    )
}

const Track = ({ order }) => {

    if (!order?.location?.position) return null;
    if (!order?.deliveryPersonPosition) return null;
    return (
        <div style={{
            display: 'flex',
            flex: "1",
            flexDirection: "column",
        }}>
            <TrackMap

                deliveryPosition={order?.location?.position}
                deliveryManPosition={order?.deliveryPersonPosition}
                address={order?.location?.address}

            />
        </div>
    )
}

const Details = ({ order }) => {
    return (
        <div
            className={styles.details}
        >
            {
                order?.orderStatus &&
                <div className={styles.detail}>
                    The order status is: {order.orderStatus}
                </div>
            }
            {
                order?.date &&
                <div className={styles.detail}>
                    You placed the order in: {order.date}
                </div>
            }
            {
                order?.deliveryMethod &&
                <div className={styles.detail}>
                    Your paying method is : {order.deliveryMethod}
                </div>
            }
            {
                order?.deliveryStartTime &&
                <div className={styles.detail}>
                    The delivery started at : {order.deliveryStartTime}
                </div>
            }
            {
                order?.deliveryEndTime &&
                <div className={styles.detail}>
                    The delivery ended at : {order.deliveryEndTime}
                </div>
            }
        </div>
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
                <PageTypeSetter order={order} pageType={pageType} setPageType={setPageType} />
                <Items order={order} />
            </div>
        )
    }

    else if (pageType === PAGE_TYPE.TRACK) {
        return (
            <div className={styles.page}>
                <TopBar orderID={orderID} />
                <PageTypeSetter order={order} pageType={pageType} setPageType={setPageType} />
                <Track order={order} />
            </div>


        )
    }

    else if (pageType === PAGE_TYPE.DETAILS) {
        return (
            <div className={styles.page}>
                <TopBar orderID={orderID} />
                <PageTypeSetter order={order} pageType={pageType} setPageType={setPageType} />
                <Details order={order} />
            </div>
        )
    }

    return null;
}


export default function Page() {
    return (
        <AuthUI InnerComponent={Order} />
    )
}