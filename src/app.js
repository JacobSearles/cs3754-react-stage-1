import React, { useState } from 'react';

import TabChooser from './ui/TabChooser';
import WelcomeTab from './tabs/welcome';
import RegisterTab from './tabs/register';
import LoginTab from './tabs/login';
import ProfileTab from './tabs/profile';
import UsersTab from './tabs/listusers';

const App = () => {
  let initialUser; // replace this with code to read user from localStorage
  if (localStorage.hasOwnProperty('currentUser')) {
    initialUser = JSON.parse(localStorage.currentUser);
  }

  // eslint-disable-next-line
  let [currentUser, updateUser] = useState(initialUser);
  return (
    <TabChooser>
      <WelcomeTab label="Welcome" />
      <RegisterTab label="Register" updateUser={updateUser} />
      <LoginTab label="Login" updateUser={updateUser} />
      <ProfileTab label="Profile" currentUser={currentUser} />
      <UsersTab label="Users" />
    </TabChooser>
  );
};

export default App;
