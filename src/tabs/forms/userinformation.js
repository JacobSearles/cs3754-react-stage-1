import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import { withFormik } from 'formik';
import * as yup from 'yup';

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

/* Form used for register new users. */
const UserForm = ({ onSubmit, message, inProgress, classes }) => {
  // we are using controlled components as per
  // https://reactjs.org/docs/forms.html#controlled-components
  // although instead of setState etc. as in class-based components
  // we are using the Hooks API

  // internal state that represents current state of the form
  const [values, setValues] = useState({
    name: '',
    password: '',
    fullname: ''
  });

  // a universal onChange handler that propagates user input to component state
  const handleChange = event => {
    let { name, value } = event.target; // name/value from input element that changed
    setValues({ ...values, [name]: value }); // update corresponding field in values object
  };
  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(values);
  };
  return (
    <Card className={classes.centered}>
      <form id="regform" onSubmit={handleSubmit}>
        <CardContent>
          <TextField
            type="text"
            name="username"
            label="Username"
            fullWidth
            margin="normal"
            value={values.username}
            onChange={handleChange}
          />
          <TextField
            type="password"
            name="password"
            label="Password"
            fullWidth
            margin="normal"
            value={values.password}
            onChange={handleChange}
          />
          <TextField
            type="text"
            name="firstname"
            label="First Name"
            fullWidth
            margin="normal"
            value={values.firstname}
            onChange={handleChange}
          />
          <TextField
            type="text"
            name="lastname"
            label="Last Name"
            fullWidth
            margin="normal"
            value={values.lastname}
            onChange={handleChange}
          />
          <TextField
            type="text"
            name="email"
            label="Email"
            fullWidth
            margin="normal"
            value={values.email}
            onChange={handleChange}
          />
          {inProgress && <LinearProgress />}
          {message && (
            <Typography color="error" variant="body1">
              {message}
            </Typography>
          )}
        </CardContent>
        <CardActions className={classes.centerChildren}>
          <Button type="submit">Submit!</Button>
        </CardActions>
      </form>
    </Card>
  );
};

UserForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  message: PropTypes.string,
  inProgress: PropTypes.bool
};

export default withStyles(styles)(
  withFormik({
    enableReinitialize: true,
    mapPropsToValues: props => ({
      username: '',
      password: '',
      password2: '',
      firstname: '',
      lastname: '',
      email: '',
      ...props.currentUser
    }),
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .email('Invalid email address')
        .required('Email is required!'),
      password: yup
        .mixed()
        .test('match', 'Passwords do not match', function(password2) {
          return password2 === this.options.parent.password2;
        })
    }),
    handleSubmit: (values, { setSubmitting, props }) => {
      props.onSubmit(values);
      setSubmitting(false);
    },
    displayName: 'UserForm' // helps with React DevTools
  })(UserForm)
);
