import React from 'react';
import { Grommet, Box, Button, Form, Text } from 'grommet';
import LoginInput from './LoginInput.jsx';
import { StreetView } from 'grommet-icons';

const LoginForm = (props) => {
	
	return (
    <Box align="center" pad="large">
      <Form>
        <LoginInput name="UserName" label="UserName" required />
        <LoginInput name="Password" label="Password" />
        <Box align="center" pad="small">
          <Button type="submit" label="Create Account" onClick={() => props.setView('mainPage')}/>
        </Box>
        <Box align="center" pad="small">
          <Button type="submit" label="Guest Login" primary onClick={() => props.setView('mainPage')} />
        </Box>
      </Form>
    </Box>
	)
};

export default LoginForm;
