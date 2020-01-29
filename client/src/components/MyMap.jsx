import React, { useState } from 'react';
import { Map, TileLayer } from 'react-leaflet';
// import Control from 'react-leaflet-control';
import MapMarkings from './MapMarkings.jsx';

const MyMap = (props) => {

  const stamenTonerTiles = 'http://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}.png';
  const stamenTonerAttr = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
  const zoomLevel = 11;

  const [mapMid, setmapMid] = useState([47.598920, -122.333730]);
  const [spots, setSpots] = useState([]);

  // ref={m => { this.leafletMap = m; }}
  
  return (
    <Map
      style={{ height: 500, width: 400, borderStyle: 'solid', borderWidth: 5 }}

      center={mapMid}
      zoom={zoomLevel}
    >
      <TileLayer
        attribution={stamenTonerAttr}
        url={stamenTonerTiles}
      />
      {spots.length > 0 ? <MapMarkings spots={spots} /> : null}
    </Map>
  )
};

export default MyMap;
