import React, { useState } from 'react';
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

let rbody = undefined;
const UsersTab = ({ classes }) => {
  const [inProgress, setInProgress] = useState(false);
  const getUsers = async () => {
    setInProgress(true);
    let res = await makeAPICall('GET', '/api/users', undefined);
    rbody = await res.json();
    setInProgress(false);
  };

  const makeTable = () => {
    //getUsers();
    if (rbody !== undefined && rbody.hasOwnProperty('users')) {
      const tableRows = rbody.users.map(user => (
        <TableRow key={user.id}>
          <TableCell>{user.id}</TableCell>
          <TableCell>{user.name}</TableCell>
          <TableCell>{user.fullname}</TableCell>
          <TableCell>{user.admin ? 'yes' : 'no'}</TableCell>
        </TableRow>
      ));

      return (
        <>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Fullname</TableCell>
              <TableCell>Admin</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{tableRows}</TableBody>
        </>
      );
    } else {
      return <TableRow />;
    }
  };

  let tableData = [];
  tableData.push(<TableCell>ID</TableCell>);
  tableData.push(<TableCell>Username</TableCell>);
  tableData.push(<TableCell>Fullname</TableCell>);
  tableData.push(<TableCell>Admin</TableCell>);

  //getUsers(tableData);

  return (
    <>
      <Typography align="center" variant="h5" gutterBottom>
        List Users
      </Typography>
      <Button
        type="button"
        onClick={() => getUsers(tableData)}
        inProgress={inProgress}
      >
        Refresh
      </Button>
      {inProgress && <LinearProgress />}
      <Paper className={classes.root}>
        <Table className={classes.table}>{makeTable()}</Table>
      </Paper>
    </>
  );
};

export default withStyles(styles)(UsersTab);
