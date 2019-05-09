import React, { useState, useEffect } from 'react';

import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableFooter from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import styles from '../styles';
import { parse as qsParse } from 'querystring';
import RequireAuthentication from '../ui/RequireAuthentication';
import { Link as RRLink } from 'react-router-dom';
import { makeAPICall } from '../api';
import WhereToVoteIcon from '@material-ui/icons/WhereToVote';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

// fetch user list, using the ?page= query param in URL
const ListQuestionsTab = ({
  classes,
  location,
  history,
  currentUser,
  updateQuestions,
  currentQuestions
}) => {
  const [message, updateMessage] = useState(null);
  const [inProgress, setInProgress] = useState(false);
  let [page, setPage] = useState(() => {
    const query = qsParse(location.search.substring(1));
    return Number(query.page) || 0;
  });

  useEffect(() => {
    const showQuestions = async () => {
      updateMessage(null);
      setInProgress(true);
      const query = qsParse(location.search.substring(1));
      const page = Number(query.page) || 0;
      setPage(page);
      let res = await makeAPICall('GET', `/api/question?page=${page}`);
      let body = await res.json();
      setInProgress(false);
      updateMessage(body.message);
      console.log(location);
      if (res.status === 200) {
        updateQuestions(body.list);
      } else {
        console.log(body);
      }
    };
    showQuestions();
  }, [location]);

  const hasPrevPage = () => {
    return page !== 0;
  };

  const hasNextPage = () => {
    let num = currentQuestions.length / 6 + 1;
    return page < num;
  };

  const gotoPage = page => {
    const pathname = history.location.pathname;
    history.push({
      pathname,
      search: `?page=${page}`
    });
    setPage(page);
  };

  const gotoNextPage = () => {
    gotoPage(page + 1);
  };

  const gotoPrevPage = () => {
    gotoPage(page - 1);
  };

  const isAdmin = Boolean(Number(currentUser.admin));

  const deleteQuestion = async id => {
    alert(id);
    let res = await makeAPICall('DELETE', `/api/question/${id}`);
    let body = await res.json();
    alert(res.status);
    if (res.status === 200) {
      window.location.href = `${process.env.PUBLIC_URL}/`;
      window.location.href = `${process.env.PUBLIC_URL}/question?page=${page}`;
    }
  };

  return (
    <>
      <Typography align="center" variant="h5" gutterBottom>
        Available Questions
      </Typography>
      <Table aria-labelledby="tableTitle">
        <TableHead>
          <TableRow>
            <TableCell align="left">ID</TableCell>
            <TableCell align="left">Question</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentQuestions.map(q => (
            <TableRow key={q.id}>
              <TableCell component="th" scope="row">
                <IconButton component={RRLink} to={'/question/' + q.id}>
                  <WhereToVoteIcon />
                </IconButton>
              </TableCell>
              <TableCell align="left">
                <TableRow>{q.question}</TableRow>
                <TableRow>{q.description}</TableRow>
              </TableCell>
              {isAdmin ? (
                <TableCell>
                  <IconButton
                    aria-label="Delete"
                    onClick={() => deleteQuestion(q.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    component={RRLink}
                    to={`/question/edit/${q.id}`}
                    aria-label="Delete"
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
              ) : (
                <TableCell />
              )}
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <IconButton
            className={styles.navClass}
            onClick={() => gotoPrevPage()}
            disabled={!hasPrevPage}
          >
            <KeyboardArrowLeft fontSize="large" />
          </IconButton>
          <IconButton
            className={styles.navClass}
            onClick={() => gotoNextPage()}
            disabled={!hasNextPage}
          >
            <KeyboardArrowRight fontSize="large" />
          </IconButton>
          <TableCell>
            {isAdmin ? (
              <Tooltip title={'Add new question'}>
                <Fab
                  color="primary"
                  aria-label="Add Question"
                  component={RRLink}
                  to={`/question/new`}
                >
                  <AddIcon />
                </Fab>
              </Tooltip>
            ) : null}
          </TableCell>
        </TableFooter>
      </Table>
    </>
  );
};

export default withStyles(styles)(RequireAuthentication(ListQuestionsTab));
