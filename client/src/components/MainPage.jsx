import React from 'react';
import { Box, Button } from 'grommet';
import { Logout } from 'grommet-icons';
import Header from './Header.jsx';
import MyMap from './MyMap.jsx';
import SpotForm from './sidebar/SpotForm.jsx';

const MainPage = (props) => {

  const { setView } = props;

	return (
    <Box fill data-testid="main-page">
      <Header />
      <Box direction='row' flex overflow={{ horizontal: 'hidden' }}>
        <Box flex align='center' justify='center' data-testid="map-section">
          <MyMap />
        </Box>
        <Box
          width='medium'
          background='light-2'
          elevation='small'
          align='center'
          justify='center'
          data-testid="form-section"
        >
          <SpotForm />
        </Box>
      </Box>
      <Button
        icon={<Logout />}
        label="Logout"
        gap="500px"
        onClick={() => setView('login')}
        data-testid="logout-button"
      />
    </Box>
	)
};

export default MainPage;
