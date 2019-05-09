import React from 'react';
import { withStyles, Button, CircularProgress } from '@material-ui/core';

const styles = {
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  }
};

export default withStyles(styles)(
  ({ classes, children, isLoading, ...props }) => (
    <Button {...props}>
      {children}
      {isLoading && (
        <CircularProgress size={24} className={classes.buttonProgress} />
      )}
    </Button>
  )
);
