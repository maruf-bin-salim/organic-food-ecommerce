import { useState, useEffect } from "react";



function useDeliveryManPosition() {



    function getCurrentPosition() {
        return new Promise((resolve, reject) => {
            const success = (position) => {
                const { latitude, longitude } = position.coords;
                const currentPosition = { lat: latitude, lng: longitude };
                resolve(currentPosition);
            };
            const error = (err) => {
                reject(err);
            };

            navigator.geolocation.getCurrentPosition(success, error);
        });
    }

    return { getCurrentPosition };

}


export default useDeliveryManPosition;
