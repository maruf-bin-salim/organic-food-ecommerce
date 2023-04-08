import Map from '@/components/Map'
import defaultPosition from '@/data/defaultPosition';
import useCurrentLocation from '@/hooks/useCurrentLocation'
import React, { useEffect, useState } from 'react'
import styles from '@/styles/Checkout.module.css'
import { useCart } from '@/hooks/useCart';
import AuthUI from '@/components/AuthUI/AuthUI';
import { clearCart, getCartAsObject } from '@/utils/cartManager';
import { addOrder } from '@/database/database_functions';
import { useRouter } from 'next/router';

function Checkout({ user }) {




    const { gotoCart } = useCart();
    const router = useRouter();




    const { position, address, zipCode, error } = useCurrentLocation();
    let [markerPosition, setMarkerPosition] = useState(defaultPosition);
    let [userAddress, setUserAddress] = useState(address);
    let [userZipCode, setUserZipCode] = useState(zipCode);
    let [userAddressLabel, setUserAddressLabel] = useState("Home");

    useEffect(() => {
        if (position) setMarkerPosition(position);
    }, [position])

    useEffect(() => {
        if (address) setUserAddress(address);
    }, [address])

    useEffect(() => {
        if (zipCode) setUserZipCode(zipCode);
    }, [zipCode])

    useEffect(() => {
        if (error) console.log(error);
    }, [error])


    // order = {
    //     cart: {
    //         products: [
    //             {
    //                 id: 1,
    //                 name: 'Product 1',
    //                 price: 100,
    //                 image: 'https://picsum.photos/200/300',
    //                 category: 'Fruits',
    //                 quantity: 5
    //             }]
    //         ,
    //         total: 500,
    //     },
    //     orderID: "124",
    //     orderStatus: "ongoing", // cancelled, ongoing, delivered
    //     location: {
    //         address: "123, abc street, xyz city",
    //         zipcode: "123456",
    //         position: { lat: 12.9716, lng: 77.5946 }
    //     },
    //     deliveryPersonPosition: { lat: 12.9716, lng: 77.5946 },
    //     date: "2021-05-02",
    //     deliveryStartTime: "2021-05-02 12:30:00",
    //     deliveryEndTime: "2021-05-02 13:00:00",
    //     orderedBy: "123",
    // }



    async function placeOrder() {

        let cart = getCartAsObject();
        let generatedUniqueStringID = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        let order = {
            cart: cart,
            orderID: generatedUniqueStringID,
            orderStatus: "ongoing", // cancelled, ongoing, delivered
            location: {
                address: userAddress,
                zipcode: userZipCode,
                position: markerPosition
            },
            deliveryPersonPosition: null,
            date: new Date().toISOString().slice(0, 10),
            deliveryStartTime: null,
            deliveryEndTime: null,
            orderedBy: user.uid,
        };
        await addOrder(order);
        clearCart();
        router.push("/orders");
    }







    return (
        <div className={styles.page}>
            <div className={styles.topBar}>
                <div className={styles.cart} onClick={gotoCart} />
                <div className={styles.pageTitle}> checkout </div>
            </div>

            <div className={styles.main}>
                <div className={styles.address}>
                    <div className={styles.addressInput}>
                        <p className={styles.inputLabel}>
                            Address
                        </p>
                        <input
                            type="text"
                            placeholder="Address"
                            value={userAddress ? userAddress : ""}
                            onChange={(e) => { setUserAddress(e.target.value) }}
                        />
                    </div>
                    <div className={styles.addressInput}>
                        <p className={styles.inputLabel}>
                            Zip Code
                        </p>
                        <input
                            type="text"
                            placeholder="Zip Code"
                            value={userZipCode ? userZipCode : ""}
                            onChange={(e) => { setUserZipCode(e.target.value) }}
                        />
                    </div>
                    <div className={styles.addressInput}>
                        <p className={styles.inputLabel}>
                            Address Label
                        </p>
                        <input
                            type="text"
                            placeholder="Label"
                            value={userAddressLabel ? userAddressLabel : ""}
                            onChange={(e) => { setUserAddressLabel(e.target.value) }}
                        />
                    </div>
                </div>
            </div>

            <div className={styles.map}>
                <Map
                    draggable={true}
                    markerPosition={markerPosition}
                    setMarkerPosition={setMarkerPosition}
                    address={address}
                />
            </div>


            <div className={styles.confirmCheckoutButton}
                onClick={async () => { placeOrder() }}>
                confirm purchase
            </div>


        </div>
    )
}

export default function Page() {
    return (
        <AuthUI InnerComponent={Checkout} />
    )
}


