import React from 'react';
import { Box, Button } from 'grommet';
import Header from './Header.jsx';
import MyMap from './MyMap.jsx';
import { StreetView } from 'grommet-icons';
import { Add, Logout } from "grommet-icons";

const MainPage = (props) => {

  const { setView } = props;

	return (
    <Box fill>
      <Header />
      <Box direction='row' flex overflow={{ horizonatal: 'hidden' }}>
        <Box flex align='center' justify='center'>
          <MyMap />
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
      <Button
        icon={<Logout />}
        label="Logout"
        gap="500px"
        onClick={() => setView('login')}
      />
    </Box>
	)
};

export default MainPage;
