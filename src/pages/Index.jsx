import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Box, Text } from '@chakra-ui/react';
import 'leaflet/dist/leaflet.css';

// Custom icon for the map pins
const pinIcon = new L.Icon({
  iconUrl: require('../assets/pin-icon.png'),
  iconRetinaUrl: require('../assets/pin-icon.png'),
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -35],
});

// Dummy data for buildings in Oslo
const buildings = [
  { id: 1, position: [59.9139, 10.7522], data: 'Sensor data 1' },
  { id: 2, position: [59.9149, 10.7522], data: 'Sensor data 2' },
  { id: 3, position: [59.9159, 10.7522], data: 'Sensor data 3' },
  { id: 4, position: [59.9169, 10.7522], data: 'Sensor data 4' },
  { id: 5, position: [59.9179, 10.7522], data: 'Sensor data 5' },
  { id: 6, position: [59.9189, 10.7522], data: 'Sensor data 6' },
  { id: 7, position: [59.9199, 10.7522], data: 'Sensor data 7' },
  { id: 8, position: [59.9209, 10.7522], data: 'Sensor data 8' },
  { id: 9, position: [59.9219, 10.7522], data: 'Sensor data 9' },
  { id: 10, position: [59.9229, 10.7522], data: 'Sensor data 10' },
];

const Index = () => {
  const [activeBuilding, setActiveBuilding] = useState(null);

  return (
    <MapContainer center={[59.9139, 10.7522]} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {buildings.map((building) => (
        <Marker
          key={building.id}
          position={building.position}
          icon={pinIcon}
          eventHandlers={{
            click: () => {
              setActiveBuilding(building);
            },
          }}
        />
      ))}
      {activeBuilding && (
        <Popup
          position={activeBuilding.position}
          onClose={() => {
            setActiveBuilding(null);
          }}
        >
          <Box>
            <Text fontWeight="bold">Building ID: {activeBuilding.id}</Text>
            <Text>{activeBuilding.data}</Text>
          </Box>
        </Popup>
      )}
    </MapContainer>
  );
};

export default Index;