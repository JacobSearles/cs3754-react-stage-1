import React, { useState } from 'react';
import { makeAPICall } from '../api';
import RequireAuthentication from '../ui/RequireAuthentication';
import { withTheme, withStyles } from '@material-ui/core/styles';
import styles from '../styles';
import {
  // Table,
  // TableHead,
  // TableBody,
  // TableRow,
  // TableCell,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  Button,
  Typography,
  Card,
  CardContent
} from '@material-ui/core';

const QuestionTab = ({ currentUser, match }) => {
  let id = match.params.id;
  const [message, updateMessage] = useState(null);
  let [currentQuestion, setCurrentQuestion] = useState({ choices: [] });
  let [currentVoted, setCurrentVoted] = useState(false);

  const getQuestion = async qid => {
    let res = await makeAPICall('GET', '/api/question/' + qid);
    let body = await res.json();
    if (res.status === 200) {
      let choices = body.choices;
      for (let i = 0; i < body.choices.length; i++) {
        choices[i] = { ...choices[i], count: 0 };
      }
      setCurrentQuestion({ ...body, choices: choices });
    }
  };

  if (currentQuestion.question == null) {
    getQuestion(id);
  }

  const [selected, setSelected] = useState('');

  const handleChange = event => {
    let { name, value } = event.target;
    setSelected(value);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    updateMessage(null);
    let res = await makeAPICall('POST', `/api/question/${id}/vote/`, {
      choice: selected
    });
    let body = await res.json();
    updateMessage(body.message);
    if (res.status === 200) {
      setCurrentVoted(true);
      let questionChoices = currentQuestion.choices;
      let votes = await makeAPICall('GET', '/api/question/' + id + '/vote/');
      let votesBody = await votes.json();
      alert(
        'returned: ' +
          votesBody.totals.length +
          ' current: ' +
          currentQuestion.choices.length
      );
      for (let i = 0; i < votesBody.totals.length; i++) {
        alert('choice: ' + votesBody.totals[i].choice);
      }
      for (let i = 0; i < votesBody.totals.length; i++) {
        if (questionChoices[i].id === votesBody.totals[i].choice) {
          questionChoices[i].count = votesBody.totals[i].count;
        }
      }
      setCurrentQuestion({ ...currentQuestion, choices: questionChoices });
    }
  };

  return (
    <div style={{ padding: 4 }}>
      <h3>{currentQuestion.question}</h3>
      <FormControl component="fieldset" className={styles.formClass}>
        <FormLabel component="legend">{currentQuestion.description}</FormLabel>
        <RadioGroup aria-label={currentQuestion.description} name="description">
          {currentQuestion.choices.map((c, i) => (
            <FormControlLabel
              key={c.id}
              value={String(c.id)}
              control={<Radio />}
              label={c.description}
              onChange={handleChange}
            />
          ))}
        </RadioGroup>
        <Button type="submit" onClick={handleSubmit}>
          Vote
        </Button>
      </FormControl>
      <Card mr="0px" ml="40px" align="right" className={styles.spacer}>
        <CardContent>
          {currentVoted ? (
            currentQuestion.choices.map((c, i) => (
              <Typography>
                {c.description}: {c.count}
              </Typography>
            ))
          ) : (
            <Typography align="center">
              You must vote before you can see the results
            </Typography>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default withStyles(styles)(RequireAuthentication(QuestionTab));
