import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeAPICall } from '../api';
import UserForm from './forms/userinformation';

const RegisterTab = ({ showSpinner, updateUser }) => {
  // an user message to be displayed, if any
  const [ message, updateMessage ] = useState(null);

  // handle user registeration
  const addNewUser = async (values) => {
    updateMessage(null);
    showSpinner(true);
    let res = await makeAPICall('POST', '/api/users', values);
    let body = await res.json();
    showSpinner(false);
    updateMessage(body.message);
    if (res.status === 200) {
      updateUser(body.user);
      localStorage.token = body.token;
    }
  }
  return (
    <>
      <h3>Register a new user</h3>
      <UserForm onSubmit={(values) => addNewUser(values)} message={message} />
    </>);
};

RegisterTab.propTypes = {
  updateUser: PropTypes.func.isRequired
}

export default RegisterTab;
