import React, { useState }  from 'react';
import { Box, Button, Heading } from 'grommet';
import { Notification } from 'grommet-icons';

const Header = (props) => {

  const [count, setCount] = useState(0);

	return (
		<Box 
      tag='header'
      direction='row'
      align='center'
      justify='between'
      background='brand'
      pad={{ left: 'medium', right: 'small', vertical: 'small' }}
      elevation='medium'
      style={{ zIndex: '1' }}
      {...props}
		>
      <Heading level='3' margin='none'> HowToPark </Heading>
      <Button 
        icon={<Notification />}
        onClick={() => setCount(count + 1)} 
      />
    </Box>
	)
};

export default Header;
