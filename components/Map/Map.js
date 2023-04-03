import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import styles from './Map.module.css'
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import 'leaflet-defaulticon-compatibility';
import { useState, useMemo, useRef, useEffect } from 'react'
import defaultPosition from '@/data/defaultPosition';



const CustomMarker = ({ draggable, markerPosition, setMarkerPosition, address }) => {
    const draggableMarkerReference = useRef(null)
    const dragEvents = useMemo(() => ({
        dragend() {
            const marker = draggableMarkerReference.current;
            if (marker) setMarkerPosition({ lat: marker.getLatLng()?.lat, lng: marker.getLatLng()?.lng });
        }
    }), []);

    if (draggable) {
        return (
            <Marker
                position={markerPosition}
                draggable={draggable}
                ref={draggableMarkerReference}
                eventHandlers={dragEvents}>
                <Popup>
                    {address}
                </Popup>
            </Marker>
        )

    }
    return (
        <Marker position={position}>
            <Popup>
                {address}
            </Popup>
        </Marker>
    )
}

function ChangeView({ center }) {
    const map = useMap();
    map.setView(center);
    return null;
}


const Map = ({ draggable, markerPosition, setMarkerPosition, address }) => {


    const [zoom, setZoom] = useState(16);
    return (
        zoom &&
        <MapContainer
            className={styles.map}
            center={markerPosition}
            zoom={zoom}
            scrollWheelZoom={true}
        >
            <ChangeView center={markerPosition} zoom={zoom} />

            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <CustomMarker
                draggable={draggable}
                markerPosition={markerPosition}
                setMarkerPosition={setMarkerPosition}
                address={address}
            />
        </MapContainer>
    )
}

export default Map;