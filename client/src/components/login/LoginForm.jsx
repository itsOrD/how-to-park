import React from 'react';
import { Box, Button, Form } from 'grommet';
import LoginInput from './LoginInput.jsx';

const LoginForm = (props) => {
	
	return (
    <Box align="center" pad="large">
      <Form>
        <LoginInput name="UserName" label="UserName" required validate={{ regexp: /^[a-z]/i }}/>
        <LoginInput name="Password" type="password" label="Password" />
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
