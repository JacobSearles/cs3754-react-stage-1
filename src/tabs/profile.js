import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import styles from '../styles';

const ProfileTab = ({ currentUser, classes }) => {
  if (currentUser.authenticated) {
    return (
      <>
        <Typography align="center" variant="h5" gutterBottom>
          Profile
        </Typography>
        <Card className={classes.centered}>
          <CardContent>
            <div className="twocols">
              <b>username: </b>
              <div>{currentUser.username}</div>
              <b>ID: </b>
              <div>{currentUser.id}</div>
              <b>First name: </b>
              <div>{currentUser.firstname}</div>
              <b>Last name: </b>
              <div>{currentUser.lastname}</div>
              <b>Email: </b>
              <div>{currentUser.email}</div>
            </div>
          </CardContent>
        </Card>
      </>
    );
  } else {
    return (
      <>
        <Typography align="center" variant="h5" gutterBottom>
          Please login to see profile information
        </Typography>
      </>
    );
  }
};

ProfileTab.propTypes = {
  currentUser: PropTypes.object
};

export default withStyles(styles)(ProfileTab);
