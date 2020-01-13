import React from 'react';
import { Box } from 'grommet';
import Header from './Header.jsx';
import MyMap from './MyMap.jsx';

const MainPage = (props) => {

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
      </Box>
	)
};

export default MainPage;
