import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles';
import UserForm from './forms/userinformation';
import { makeAPICall } from '../api';

const EditProfileTab = ({ updateUser, currentUser }) => {
  const [message, updateMessage] = useState(null);
  const [inProgress, setInProgress] = useState(false);

  const updateProfile = async values => {
    updateMessage(null);
    setInProgress(true);
    let res = await makeAPICall('PUT', `/api/users/${currentUser.id}`, values);
    let body = await res.json();
    setInProgress(false);
    updateMessage(body.message);
    if (res.status === 200) {
      updateUser(body);
      updateMessage('User has been updated');
    }
  };

  return (
    <>
      <Typography align="center" variant="h5" gutterBottom>
        Edit Profile
      </Typography>
      <UserForm
        onSubmit={values => updateProfile(values)}
        message={message}
        inProgress={inProgress}
      />
    </>
  );
};

EditProfileTab.propTypes = {
  updateUser: PropTypes.object
};

export default withStyles(styles)(EditProfileTab);
