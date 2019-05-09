import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles';
import NewQuestionForm from './forms/newquestionform';
import { makeAPICall } from '../api';
import RequireAuthentication from '../ui/RequireAuthentication';

const EditQuestionTab = ({ match }) => {
  const id = match.params.id;
  const [message, updateMessage] = useState(null);
  const [inProgress, setInProgress] = useState(false);

  const updateQuestion = async values => {
    updateMessage(null);
    setInProgress(true);
    let res = await makeAPICall('PUT', `/api/question/${id}`, values);
    let body = await res.json();
    setInProgress(false);
    updateMessage(body.message);
    if (res.status === 200) {
      updateMessage('Question has been updated');
    }
  };

  const oldValues = async id => {
    let res = await makeAPICall('GET', `/api/question/${id}`);
    let body = await res.json();
    if (res.status === 200) {
      return body.ret;
    }
  };

  return (
    <>
      <Typography align="center" variant="h5" gutterBottom>
        Edit Question
      </Typography>
      <NewQuestionForm
        question={id => oldValues(id)}
        onSubmit={values => updateQuestion(values)}
        message={message}
        inProgress={inProgress}
      />
    </>
  );
};

export default withStyles(styles)(RequireAuthentication(EditQuestionTab));
