import React, { useState, useEffect } from 'react';
import { Box, Grommet } from 'grommet';
import Login from './components/Login.jsx';
import MainPage from './components/MainPage.jsx';

const App = (props) => {

  const [view, setView] = useState('login')

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
      return <Login />
    } else {
      return <MainPage setView={setView} />
    }
  }

  return (
    <Grommet theme={theme} full>
        {renderView()}
        <button onClick={() => setView('')}>switch view</button>
    </Grommet>
  )
};

export default App;
