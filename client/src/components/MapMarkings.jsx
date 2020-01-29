import React from 'react';
import { Marker, Popup } from 'react-leaflet';

const MapMarkings = ({ spots }) => {
  const marks = spots.map((spot) => {
    if (spot.latitude && spot.longitude) {
      return (
        <Marker 
          key={spot.id} 
          position={
            [
              Number.parseFloat(spot.latitude),
              Number.parseFloat(spot.longitude)
            ]
          }
        >
          <Popup>
            {spot.size}
          </Popup>
        </Marker>
      )
    }
  });
  return (marks);
};

export default MapMarkings;
