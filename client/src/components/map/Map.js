import React from 'react';
import L from 'leaflet';
import './map.scss';
import { MapContainer, TileLayer, } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import MapMarker from '../mapMarker/MapMarker';

const Map = ({ items }) => {
    // console.log(items);
    let DefaultIcon = L.icon({
        iconUrl: icon,
        shadowUrl: iconShadow
    });

    L.Marker.prototype.options.icon = DefaultIcon;

    return (
        <MapContainer center={
            items?.length === 1
                ? [items[0]?.latitude, items[0]?.longitude]
                : [52.4797, -1.90269]
        } zoom={7} scrollWheelZoom={true} className='map'>

            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {items?.map(item => (
                <MapMarker item={item} key={item.id} />
            ))}
        </MapContainer>
    );
};

export default Map;