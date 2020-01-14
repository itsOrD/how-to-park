import React, { useState, useEffect } from 'react';
import { Box, Grommet } from 'grommet';
import Login from './components/login/Login.jsx';
import MainPage from './components/MainPage.jsx';

const App = (props) => {

  const [view, setView] = useState('login');

  const mapCenter = [47.598920, -122.333730];

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

  const renderView = () => {
    if (view === 'login') {
      return <Login mapCenter={mapCenter} setView={setView} />
    } else {
      return <MainPage setView={setView} mapCenter={mapCenter} />
    }
  }

  return (
    <Grommet theme={theme} full>
        {renderView()}
    </Grommet>
  )
};

export default App;
