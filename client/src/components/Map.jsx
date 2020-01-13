import React, { useState, useEffect } from 'react';
import { Box } from 'grommet';
import { Map, TileLayer } from 'react-leaflet';
import Control from 'react-leaflet-control';

class MyMap extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentZoomLevel: 11
    }
  }

  render() {

    const stamenTonerTiles = 'http://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}.png';
    const stamenTonerAttr = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
    const mapCenter = [47.598920, -122.333730];
    const zoomLevel = 11;
    
    return (
        <Map
          style={{ height: 500, width: 400, borderStyle: 'solid', borderWidth: 5 }}
          ref={m => { this.leafletMap = m; }}
          center={mapCenter}
          zoom={zoomLevel}
        >
          <TileLayer
            attribution={stamenTonerAttr}
            url={stamenTonerTiles}
          />
        </Map>
    )
  }
};

export default MyMap;
