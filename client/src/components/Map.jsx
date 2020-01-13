import React, { useState, useEffect } from 'react';
import { Box } from 'grommet';
import { Map, TileLayer } from 'react-leaflet';

const Map = (props) => {

	return (
		<Box>
      <Map>
        <TileLayer />
      </Map>
		</Box>
	)
};

export default Map;
