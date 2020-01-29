import React from 'react';
import { Box } from 'grommet';
import { Car } from 'grommet-icons';
import LoginForm from './LoginForm.jsx';

const LoginBox = (props) => {

  return (
    <Box
      pad="large"
      align="center"
      background={{ color: "light-1", opacity: "0.93" }}
      round
      gap="small"
      style={{ maxHeight: 600, maxWidth: 600 }}
    >
      <Car size="large" />
      <h2>Login</h2>
      <LoginForm setView={props.setView} />
    </Box>
  )
};

export default LoginBox;
