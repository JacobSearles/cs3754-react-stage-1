import React, { useState } from 'react';
import PropTypes from 'prop-types';

/* Form used for register new users. */
const LoginForm = ({ onSubmit, message }) => {
  // we are using controlled components as per
  // https://reactjs.org/docs/forms.html#controlled-components
  // although instead of setState etc. as in class-based components
  // we are using the Hooks API

  // internal state that represents current state of the form
  const [values, setValues] = useState({
    name: '',
    password: ''
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
    <form id="regform" onSubmit={handleSubmit}>
      <div className="twocols">
        <label>Username</label>
        <input
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Submit!</button>
      {message ? (
        <div>
          <p>{message}</p>
        </div>
      ) : null}
    </form>
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  message: PropTypes.string
};

export default LoginForm;
