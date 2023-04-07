import { OPEN_CAGE_DATA_API_KEY } from "@/data/opencagedata";
import { useState, useEffect } from "react";



function useCurrentLocation() {
    const [currentLocation, setCurrentLocation] = useState({
        position: null,
        address: "",
        zipCode: null,
        error: null,
    });

    useEffect(() => {
        const success = async (position) => {
            const { latitude, longitude } = position.coords;
            const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${OPEN_CAGE_DATA_API_KEY}`;
            const response = await fetch(url);
            const data = await response.json();
            const address = data?.results[0]?.formatted;
            const zipCode = data?.results[0]?.components?.postcode;

            setCurrentLocation({
                position: { lat: latitude, lng: longitude },
                address: address,
                zipCode: zipCode,
                error: null,
            });
        };

        const error = (err) => {
            console.error(`ERROR(${err.code}): ${err.message}`);
            setCurrentLocation({
                position: null,
                address: "",
                zipCode: null,
                error: err.message,
            });
        };

        navigator.geolocation.getCurrentPosition(success, error);
    }, []);

    return currentLocation;
}

export default useCurrentLocation;
