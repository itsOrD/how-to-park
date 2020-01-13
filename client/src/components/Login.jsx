import React from 'react';
import { Box, WorldMap } from 'grommet';

const Login = () => {

	return (
		<Box>
      <WorldMap
        color="neutral-1"
        continents={[
          {
            name: 'Africa',
            color: 'light-5',
            onClick: (name) => {},
          },
        ]}
        onSelectPlace={(lat, lon) => {}}
        places={[
          {
            name: 'Seattle',
            location: [-33.8830555556, 151.216666667],
            color: 'accent-2',
            onClick: (name) => {},
          },
        ]}
        selectColor="accent-2"
      />
		</Box>
	)
};

export default Login;
