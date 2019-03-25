import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeAPICall } from '../api';
//import UserForm from './forms/userinformation';
import LoginForm from './forms/logininformation';

const LoginTab = ({ showSpinner, updateUser }) => {
  // an user message to be displayed, if any
  const [message, updateMessage] = useState(null);

  // handle user registeration
  const login = async values => {
    updateMessage(null);
    showSpinner(true);
    let res = await makeAPICall('POST', '/api/login', values);
    let body = await res.json();
    showSpinner(false);
    updateMessage(body.message);
    if (res.status === 200) {
      updateUser(body.user);
      localStorage.token = body.token;
    }
  };
  return (
    <>
      <h3>Login</h3>
      <LoginForm onSubmit={values => login(values)} message={message} />
    </>
  );
};

LoginTab.propTypes = {
  updateUser: PropTypes.func.isRequired
};

export default LoginTab;
