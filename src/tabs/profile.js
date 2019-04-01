import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';

const styles = theme => ({
  centered: {
    margin: '0 auto', // https://learnlayout.com/max-width.html
    maxWidth: 600
  },
  centerChildren: {
    justifyContent: 'center'
  },
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
});

const ProfileTab = ({ currentUser, classes }) => {
  if (currentUser) {
    return (
      <>
        <Typography align="center" variant="h5" gutterBottom>
          Profile
        </Typography>
        <Card className={classes.centered}>
          <CardContent>
            <div className="twocols">
              <b>username: </b>
              <div>{currentUser.name}</div>
              <b>ID: </b>
              <div>{currentUser.id}</div>
              <b>Full name: </b>
              <div>{currentUser.fullname}</div>
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
