import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const pinIcon = new L.Icon({
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
  shadowSize: [41, 41]
});

const generateRandomCoordinates = () => {
  const latMin = 59.8;
  const latMax = 60.0;
  const lngMin = 10.5;
  const lngMax = 10.9;
  return {
    lat: Math.random() * (latMax - latMin) + latMin,
    lng: Math.random() * (lngMax - lngMin) + lngMin
  };
};

const buildings = Array.from({ length: 10 }, generateRandomCoordinates);

const Index = () => {
  const [activeBuilding, setActiveBuilding] = useState(null);

  return (
    <MapContainer center={[59.9139, 10.7522]} zoom={13} style={{ height: '100vh', width: '100vw' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {buildings.map((building, idx) => (
        <Marker
          key={idx}
          position={[building.lat, building.lng]}
          icon={pinIcon}
          eventHandlers={{
            click: () => {
              setActiveBuilding(building);
            },
          }}
        >
          {activeBuilding === building && (
            <Popup position={[building.lat, building.lng]}>
              <div>
                <h2>Building {idx + 1}</h2>
                <p>Sensor Data: ...</p>
              </div>
            </Popup>
          )}
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Index;