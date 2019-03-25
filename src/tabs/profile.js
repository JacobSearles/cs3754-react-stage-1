import React from 'react';
import PropTypes from 'prop-types';

const ProfileTab = ({ currentUser }) => {
  if (currentUser) {
    alert('asdf');
    return (
      <>
        <h3>Profile</h3>
        <div className="twocols">
          <b>username: </b>
          <div>{currentUser.name}</div>
          <b>ID: </b>
          <div>{currentUser.id}</div>
          <b>Full name: </b>
          <div>{currentUser.fullname}</div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <h3>Profile</h3>
        <p>Please login to see profile information</p>
      </>
    );
  }
};

ProfileTab.propTypes = {
  updateUser: PropTypes.func.isRequired
};

export default ProfileTab;
