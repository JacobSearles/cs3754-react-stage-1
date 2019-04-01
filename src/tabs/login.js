import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeAPICall } from '../api';
//import UserForm from './forms/userinformation';
import LoginForm from './forms/logininformation';
import Typography from '@material-ui/core/Typography';

const LoginTab = ({ updateUser }) => {
  // an user message to be displayed, if any
  const [message, updateMessage] = useState(null);
  const [inProgress, setInProgress] = useState(false);

  // handle user registeration
  const login = async values => {
    updateMessage(null);
    setInProgress(true);
    let res = await makeAPICall('POST', '/api/login', values);
    let body = await res.json();
    setInProgress(false);
    updateMessage(body.message);
    if (res.status === 200) {
      updateUser(body.user);
      localStorage.token = body.token;
    }
  };
  return (
    <>
      <Typography align="center" variant="h5" gutterBottom>
        Login
      </Typography>
      <LoginForm
        onSubmit={values => login(values)}
        message={message}
        inProgress={inProgress}
      />
    </>
  );
};

LoginTab.propTypes = {
  updateUser: PropTypes.func.isRequired
};

export default LoginTab;
