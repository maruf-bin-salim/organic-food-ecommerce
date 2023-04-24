import AuthUI from '@/components/AuthUI/AuthUI';
import TrackMap from '@/components/TrackMap';
import { updateDeliveryEndTime, updateDeliveryPersonPosition, updateDeliveryStartTime, updateOrderStatus } from '@/database/database_functions';
import useDeliveryManPosition from '@/hooks/useDeliveryManPosition';
import useOrder from '@/hooks/useOrder';
import { Router, useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import styles from "../../styles/Order.module.css";



// write a function that takes in an array of product and a total price
// this function returns a table of products and their prices and their quantities
// and the total price at the bottom

function ProductTable({ products, totalPrice }) {
    console.log(products);
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
                            <td>{product.quantity} kg</td>
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
            <div className={styles.backButton} onClick={() => { router.push('/deliveryman') }} />
            <div className={styles.pageTitle}> # Order {orderID} </div>
        </div>
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


const Order = () => {



    const { getCurrentPosition } = useDeliveryManPosition();

    const router = useRouter();
    const [orderID, setOrderID] = useState(null);
    const [loading, setLoading] = useState(false);

    async function startDelivery() {

        if (!orderID) return;
        setLoading(true);
        let currentDateTimeString = new Date().toLocaleString();
        await updateDeliveryStartTime(orderID, currentDateTimeString);
        await updateOrderStatus(orderID, "delivery_started");
        setLoading(false);
        router.reload();
    }

    async function endDelivery() {
        if (!orderID) return;
        setLoading(true);
        let currentDateTimeString = new Date().toLocaleString();
        await updateDeliveryEndTime(orderID, currentDateTimeString);
        await updateOrderStatus(orderID, "delivered");
        setLoading(false);
        router.reload();
    }

    async function updatePosition() {
        let position = await getCurrentPosition();
        if (!orderID) return;
        setLoading(true);
        await updateDeliveryPersonPosition(orderID, position);
        setLoading(false);
        router.reload();
    }



    useEffect(() => {
        if (router.query.orderID) {
            setOrderID(router.query.orderID);
        }
    }, [router.query]);


    const order = useOrder(orderID);
    console.log(order);

    if (loading) {
        return (
            <div className={styles.page}>
                <TopBar orderID={orderID} />
                <div className={styles.loading}>
                    loading...
                </div>
            </div>
        )
    }



    {

        return (
            <div className={styles.page}>
                <TopBar orderID={orderID} />
                <ProductTable products={order?.cart?.products} totalPrice={order?.cart?.total} />
   
                {
                    order?.deliveryMethod &&
                    <div className={styles.detail}>
                        The customer is paying with : {order?.deliveryMethod}
                    </div>
                }

                {
                    order?.orderStatus === "ongoing" &&
                    <div className={styles.delivery_action_button} onClick={startDelivery}>
                        start delivery
                    </div>
                }
                {
                    order?.orderStatus === "delivery_started" &&
                    <Track order={order} />
                }
                {
                    order?.orderStatus === "delivery_started" &&
                    <div className={styles.delivery_action_button} onClick={updatePosition}>
                        update position
                    </div>
                }


                {
                    order?.orderStatus === "delivery_started" &&
                    <div className={styles.delivery_action_button} onClick={endDelivery}>
                        end delivery
                    </div>
                }

                {
                    order?.orderStatus === "delivered" &&
                    <div className={styles.detail}>
                        delivery started at {order?.deliveryStartTime}
                    </div>
                }

                {
                    order?.orderStatus === "delivered" &&
                    <div className={styles.detail}>
                        delivered at {order?.deliveryEndTime}
                    </div>
                }
            </div>
        )
    }


}





export default Order;