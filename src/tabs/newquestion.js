import React, { useState, useEffect } from 'react';
import { makeAPICall } from '../api';
import RequireAuthentication from '../ui/RequireAuthentication';
import { Link as RRLink } from 'react-router-dom';
import styles from '../styles';
import { withFormik, Field, Form } from 'formik';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import MultiEntryField from './forms/MultiEntryField';
import Button from '@material-ui/core/Button';
import NewQuestionForm from './forms/newquestionform';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Card, CardHeader, CardContent } from '@material-ui/core';

const NewQuestionTab = ({
  classes,
  currentQuestion,
  updateQuestion,
  updateQuestions
}) => {
  const [message, updateMessage] = useState(null);
  const [inProgress, setInProgress] = useState(false);
  const handleSubmit = async values => {
    updateMessage(null);
    setInProgress(true);
    let res = await makeAPICall('POST', '/api/question', values);
    let body = await res.json();
    setInProgress(false);
    updateMessage(body.message);
    if (res.status === 200) {
      //updateQuestions(body);
      updateMessage('Question has been created');
    }
  };
  return (
    <Grid container>
      <Card className={classes.newQuestionCard}>
        <CardHeader
          title={<Typography variant="h4">Add a New Question</Typography>}
        />
        <CardContent>
          <NewQuestionForm
            question={{ question: '', description: '', type: 1, choices: [] }}
            onSubmit={v => handleSubmit(v)}
            message={message}
          />
        </CardContent>
      </Card>
    </Grid>
  );
};

export default withStyles(styles)(RequireAuthentication(NewQuestionTab));
