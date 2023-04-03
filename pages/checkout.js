import Map from '@/components/Map'
import defaultPosition from '@/data/defaultPosition';
import useCurrentLocation from '@/hooks/useCurrentLocation'
import React, { useEffect, useState } from 'react'

function checkout() {
    


    const { position, address, zipCode, error } = useCurrentLocation();
    let [markerPosition, setMarkerPosition] = useState(defaultPosition);

    useEffect(() => {
        if (position) setMarkerPosition(position);
    }, [position])

    return (
        <div style={{ height: "100vh", width: "100vw" }}>
            <Map
                draggable={true}
                markerPosition={markerPosition}
                setMarkerPosition={setMarkerPosition}
                address={address}
            />
        </div>
    )
}

export default checkout