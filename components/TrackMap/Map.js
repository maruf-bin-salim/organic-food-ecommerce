import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import styles from './Map.module.css'
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import 'leaflet-defaulticon-compatibility';
import { useState, useMemo, useRef, useEffect } from 'react'
import defaultPosition from '@/data/defaultPosition';
import L from 'leaflet';


const CustomMarker = ({ markerPosition, address, isProduct }) => {


    if (isProduct) {
        return (
            <Marker position={markerPosition}
                icon={new L.Icon({
                    iconUrl: '/delivery.svg',
                    iconRetinaUrl: '/delivery.svg',
                    iconAnchor: [5, 55],
                    popupAnchor: [10, -44],
                    iconSize: [50, 85],
                    shadowSize: [68, 95],
                    shadowAnchor: [20, 92]
                })}
            >
                <Popup>
                    {address}
                </Popup>
            </Marker>
        )
    }
    else {
        return (
            <Marker position={markerPosition}>
                <Popup>
                    {address}
                </Popup>
            </Marker>
        )
    }
}

function ChangeView({ center }) {
    const map = useMap();
    map.setView(center);
    return null;
}


const Map = ({ deliveryPosition, deliveryManPosition, address }) => {


    const [zoom, setZoom] = useState(10);
    return (
        zoom &&
        <MapContainer
            className={styles.map}
            center={deliveryManPosition}
            zoom={zoom}
            scrollWheelZoom={true}
        >
            <ChangeView center={deliveryManPosition} zoom={zoom} />

            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <CustomMarker
                markerPosition={deliveryManPosition}
                address={"Products are here"}
                isProduct={true}
            />

            <CustomMarker
                markerPosition={deliveryPosition}
                address={address}
            />
        </MapContainer>
    )
}

export default Map;