import Map from '@/components/Map'
import defaultPosition from '@/data/defaultPosition';
import useCurrentLocation from '@/hooks/useCurrentLocation'
import React, { useEffect, useState } from 'react'
import styles from '@/styles/Checkout.module.css'
import { useCart } from '@/hooks/useCart';

function checkout() {




    const { gotoCart } = useCart();



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
                onClick={() => { router.push('/checkout') }}>
                confirm purchase
            </div>


        </div>
    )
}

export default checkout