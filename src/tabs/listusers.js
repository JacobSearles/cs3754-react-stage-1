import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { makeAPICall } from '../api';

let rbody = undefined;
const UsersTab = ({ showSpinner }) => {
  const getUsers = async () => {
    showSpinner(true);
    let res = await makeAPICall('GET', '/api/users', undefined);
    rbody = await res.json();
    showSpinner(false);
  };

  const makeTable = () => {
    //getUsers();
    if (rbody !== undefined && rbody.hasOwnProperty('users')) {
      const tableRows = rbody.users.map(user => (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.fullname}</td>
          <td>{user.admin ? 'yes' : 'no'}</td>
        </tr>
      ));

      return (
        <tbody>
          <tr>
            <th>Id</th>
            <th>Username</th>
            <th>Fullname</th>
            <th>Admin</th>
          </tr>
          {tableRows}
        </tbody>
      );
    } else {
      return (
        <tbody>
          <tr>
            <th>You do not have permission</th>
          </tr>
        </tbody>
      );
    }
  };

  let tableData = [];
  tableData.push(<th>ID</th>);
  tableData.push(<th>Username</th>);
  tableData.push(<th>Fullname</th>);
  tableData.push(<th>Admin</th>);

  //getUsers(tableData);

  return (
    <>
      <h3>List Users</h3>
      <button type="button" onClick={() => getUsers(tableData)}>
        Refresh
      </button>
      <table>{makeTable()}</table>
    </>
  );
};

export default UsersTab;
