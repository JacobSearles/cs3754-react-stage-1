import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeAPICall } from '../api';
import UserForm from './forms/userinformation';
import Typography from '@material-ui/core/Typography';

const RegisterTab = ({ updateUser }) => {
  // an user message to be displayed, if any
  const [message, updateMessage] = useState(null);
  let [inProgress, setInProgress] = useState(false);

  // handle user registeration
  const addNewUser = async values => {
    updateMessage(null);
    setInProgress(true);
    let res = await makeAPICall('POST', '/api/users', values);
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
        Register a new user
      </Typography>
      <UserForm
        onSubmit={values => addNewUser(values)}
        message={message}
        inProgress={inProgress}
      />
    </>
  );
};

RegisterTab.propTypes = {
  updateUser: PropTypes.func.isRequired
};

export default RegisterTab;
