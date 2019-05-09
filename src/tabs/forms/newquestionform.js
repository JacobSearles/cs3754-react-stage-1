import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withFormik, Field, Form } from 'formik';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import styles from '../../styles';
import { Link as RRLink } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import MultiEntryField from './MultiEntryField';
import ProgressButton from '../../ui/ProgressButton';

// ---------

const NewQuestionForm = ({
  onSubmit,
  setFieldValue,
  values,
  isLoading,
  classes,
  message
}) => {
  // internal state that represents current state of the form
  const [valuess, setValuess] = useState({
    question: '',
    description: '',
    type: 1
  });

  // a universal onChange handler that propagates user input to component state
  const handleChange = event => {
    let { name, value } = event.target; // name/value from input element that changed
    setValuess({ ...valuess, [name]: value }); // update corresponding field in values object
  };
  const handleSubmit = event => {
    event.preventDefault();
    valuess.choices = values.choices;
    onSubmit(valuess);
  };
  return (
    <form id="regform" onSubmit={handleSubmit}>
      <TextField
        type="text"
        name="question"
        fullWidth
        label={'Question'}
        value={valuess.question}
        onChange={handleChange}
      />
      <TextField
        type="text"
        name="description"
        label={'Description'}
        fullWidth
        multiline
        rows={10}
        value={valuess.description}
        onChange={handleChange}
      />
      <MultiEntryField
        name="choices"
        value={values.choices}
        onChange={v => setFieldValue('choices', v)}
        entryLabel={idx => `#${idx + 1}`}
        addButtonLabel="Add a new choice"
        newEntryDefault="Enter Choice"
      />
      <Toolbar>
        <ProgressButton
          type="submit"
          isLoading={isLoading}
          color="primary"
          className={classes.grow1}
        >
          Submit!
        </ProgressButton>
        <Button className={classes.grow1} component={RRLink} to={`/`}>
          Close
        </Button>
      </Toolbar>
      {message && (
        <Typography color="error" variant="body1" gutterBottom>
          {message}
        </Typography>
      )}
    </form>
  );
};

const validate = values => {
  const errors = {};
  //if (values && values.choices)
  //    console.dir("Validate choices: " + values.choices.join());
  return errors;
};

export default withStyles(styles)(
  withFormik({
    mapPropsToValues: ({ question }) => ({
      question: '',
      description: '',
      ...question
    }),
    validate,
    enableReinitialize: true,
    handleSubmit: (valuess, { setSubmitting, props }) => {
      props.onSubmit(valuess);
      setSubmitting(false);
    },
    displayName: 'NewQuestionForm' // helps with React DevTools
  })(NewQuestionForm)
);
