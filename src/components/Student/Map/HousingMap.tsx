import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useHousing } from '../../../context/HousingContext';
import L from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const HousingMap: React.FC = () => {
    const { listings } = useHousing();
    const defaultCenter: [number, number] = [28.5355, 77.3910];

    return (
        <div className="map-wrapper" style={{ height: '400px', width: '100%', borderRadius: '16px', overflow: 'hidden' }}>
            <MapContainer center={defaultCenter} zoom={15} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {listings.map((listing) => (
                    <Marker position={[listing.location.lat, listing.location.lng]} key={listing.id}>
                        <Popup>
                            <div style={{ fontWeight: 'bold' }}>{listing.title}</div>
                            <div>₹{listing.price}/mo</div>
                            <div style={{
                                color: listing.safetyScore >= 80 ? 'green' : listing.safetyScore >= 50 ? 'orange' : 'red',
                                fontWeight: 'bold',
                                marginTop: '4px'
                            }}>
                                Safety: {listing.safetyScore}%
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default HousingMap;
