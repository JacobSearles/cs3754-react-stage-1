import React, { useState, useEffect } from 'react';
import { makeAPICall } from '../api';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import { parse as qsParse } from 'querystring';
import TableFooter from '@material-ui/core/TableHead';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import RequireAuthentication from '../ui/RequireAuthentication';
import styles from '../styles';

//let rbody = undefined;
const UsersTab = ({
  classes,
  currentUsers,
  updateUsers,
  history,
  location
}) => {
  const [inProgress, setInProgress] = useState(false);
  const [message, updateMessage] = useState(null);
  let [page, setPage] = useState(() => {
    const query = qsParse(location.search.substring(1));
    return Number(query.page) || 0;
  });

  useEffect(() => {
    const showUsers = async () => {
      updateMessage(null);
      setInProgress(true);
      const query = qsParse(location.search.substring(1));
      const page = Number(query.page) || 0;
      setPage(page);
      let res = await makeAPICall('GET', `/api/users/?page=${page}`);
      let body = await res.json();
      setInProgress(false);
      updateMessage(body.message);
      console.log(history);
      if (res.status === 200) {
        updateUsers(body.list);
      } else {
        console.log(body);
      }
    };
    showUsers();
  }, [location]);

  const hasPrevPage = () => {
    return page !== 0;
  };

  const hasNextPage = () => {
    let num = currentUsers.length / 6 + 1;
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

  return (
    <>
      <Typography align="center" variant="h5" gutterBottom>
        Users
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Firstname</TableCell>
            <TableCell>Lasstname</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Admin</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentUsers.map(u => (
            <TableRow key={u.id}>
              <TableCell>{u.id}</TableCell>
              <TableCell>{u.username}</TableCell>
              <TableCell>{u.firstname}</TableCell>
              <TableCell>{u.lastname}</TableCell>
              <TableCell>{u.email}</TableCell>
              <TableCell>{u.admin ? 'yes' : 'no'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
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
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
};

export default withStyles(styles)(RequireAuthentication(UsersTab));
