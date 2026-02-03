import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import MapMarkings from './MapMarkings.jsx';

// Component to handle map updates when center changes
const MapUpdater = ({ center }) => {
  const map = useMap();
  
  useEffect(() => {
    if (center) {
      map.setView(center, map.getZoom());
    }
  }, [center, map]);
  
  return null;
};

const MyMap = (props) => {
  // Black and white OpenStreetMap tiles
  const openStreetMapTiles = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const openStreetMapAttr = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
  
  const defaultCenter = [47.598920, -122.333730]; // Seattle
  const zoomLevel = 11;

  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [spots, setSpots] = useState([]);
  const [locationError, setLocationError] = useState(null);

  // Get user's location on mount
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setMapCenter([latitude, longitude]);
        },
        (error) => {
          console.log('Geolocation error:', error.message);
          setLocationError(error.message);
          // Keep default center if geolocation fails
        }
      );
    } else {
      console.log('Geolocation not available');
      setLocationError('Geolocation not supported');
    }
  }, []);

  return (
    <MapContainer
      center={mapCenter}
      zoom={zoomLevel}
      style={{ height: '100%', width: '100%', minHeight: '500px' }}
      data-testid="map-container"
    >
      <MapUpdater center={mapCenter} />
      <TileLayer
        attribution={openStreetMapAttr}
        url={openStreetMapTiles}
        className="map-tiles"
      />
      {spots.length > 0 ? <MapMarkings spots={spots} /> : null}
    </MapContainer>
  );
};

export default MyMap;
