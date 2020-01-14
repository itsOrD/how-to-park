import React from 'react';
import { Box, WorldMap } from 'grommet';
import LoginBox from './LoginBox.jsx';

const Login = (props) => {

	return (
		<Box style={{ position: 'relative' }}>
      <WorldMap
        color="neutral-1"
        continents={[
          {
            name: 'North America',
            color: 'light-5',
            onClick: (name) => {},
          },
        ]}
        onSelectPlace={(lat, lon) => {}}
        places={[
          {
            name: 'Seattle',
            location: props.mapCenter,
            color: 'accent-2',
            onClick: (name) => {},
          },
        ]}
        selectColor="accent-2"

      />

      <Box style={{ position: 'absolute', marginLeft: '22%' }}>
        <LoginBox mapCenter={props.mapCenter} setView={props.setView} />
      </Box>

		</Box>
	)
};

export default Login;
