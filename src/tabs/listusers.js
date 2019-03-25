import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { makeAPICall } from '../api';

const UsersTab = ({ showSpinner }) => {
  const getUsers = async tableData => {
    this.preventDefault();
    showSpinner(true);
    let res = await makeAPICall('GET', '/api/users');
    let rbody = await res.json();
    alert(rbody.users[0].name);
    for (var i = rbody.users.length - 1; i >= 0; i--) {
      tableData.push(<td>{rbody.users[i].id}</td>);
      tableData.push(<td>{rbody.users[i].name}</td>);
      tableData.push(<td>{rbody.users[i].fullname}</td>);
      tableData.push(<td>{rbody.users[i].admin ? 'yes' : 'no'}</td>);
    }
    showSpinner(false);
  };

  let tableData = [];
  tableData.push(<th>ID</th>);
  tableData.push(<th>Username</th>);
  tableData.push(<th>Fullname</th>);
  tableData.push(<th>Admin</th>);

  getUsers(tableData);

  return <table>{tableData}</table>;
};

export default UsersTab;
