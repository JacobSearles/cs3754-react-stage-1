import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeAPICall } from '../api';
//import UserForm from './forms/userinformation';
import LoginForm from './forms/logininformation';
import Typography from '@material-ui/core/Typography';
import { withRouter, Redirect } from 'react-router';
import useDataApi from '../apihook';
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles';
import { Link } from 'react-router-dom';

const LoginTab = ({ updateUser, currentUser, location, classes }) => {
  // an user message to be displayed, if any
  const [message, updateMessage] = useState(null);
  const [inProgress, setInProgress] = useState(false);

  const isAuthenticated = currentUser.authenticated;
  if (isAuthenticated) {
    const { from } = location.state || { from: { pathname: '/' } };
    console.log(`already authenticated, redirecting to ${from.pathname}`);
    return <Redirect to={from} />;
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  let { data, isLoading, isError, isOk, errorMessage, request } = useDataApi(
    null,
    null,
    data => data.token
  );

  // handle user registeration
  const login = async values => {
    updateMessage(null);
    setInProgress(true);
    let res = await makeAPICall('POST', '/api/login', values);
    let body = await res.json();
    setInProgress(false);
    updateMessage(body.message);
    if (res.status === 200) {
      isOk = true;
      updateUser(body.user);
      localStorage.token = body.token;
      window.location.href = `${process.env.PUBLIC_URL}/`;
    }
  };
  if (isOk) {
    updateUser(data.user);
    const { from } = location.state || { from: { pathname: '/' } };
    console.log(`updated user, now redirecting to ${from.pathname}`);
    return <Redirect to={from} />;
  }
  return (
    <>
      <Typography align="center" variant="h5" gutterBottom>
        Login
      </Typography>
      <LoginForm
        onSubmit={values => login(values)}
        onClick="window.location.href='/'"
        message={message}
        inProgress={inProgress}
      />
      <Typography
        className={classes.topPadding}
        align="center"
        variant="body1"
        gutterBottom
      >
        <Link to={'/register'}>Click here to register</Link>
      </Typography>
    </>
  );
};

LoginTab.propTypes = {
  updateUser: PropTypes.func.isRequired
};

export default withStyles(styles)(withRouter(LoginTab));
