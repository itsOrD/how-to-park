import React from 'react';
import { Box, Grommet } from 'grommet';
import Header from './components/Header.jsx';

class App extends React.Component {
	constructor(props) {
    super(props)
    this.state = {
      //
    }
  }

  render() {

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
              app body
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
  }
};

export default App;
