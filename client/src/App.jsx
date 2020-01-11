import React, { useState, useEffect } from 'react';
import { Box, Grommet } from 'grommet';
import Header from './components/Header.jsx';
import Map from './components/Map.jsx';

const App = (props) => {

  const [map, setMap] = useState('');

  useEffect(() => {
    // call the function that inits GET for map here
  })

  const theme = {
    global: {
      colors: {
        // brand: '#FD6A02',
        brand: '#FF7417'
      },
      font: {
        family: 'Roboto',
        size: '27px',
        height: '30px',
      },
    },
  };

  return (
    <Grommet theme={theme} full>
      <Box fill>
        <Header />
        <Box direction='row' flex overflow={{ horizonatal: 'hidden' }}>
          <Box flex align='center' justify='center'>
            <Map />
          </Box>
          <Box
            width='medium'
            background='light-2'
            elevation='small'
            align='center'
            justify='center'
          >
            sidebar
          </Box>
        </Box>
      </Box>
    </Grommet>
  )
};

export default App;
