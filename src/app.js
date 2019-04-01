import React, { useState } from 'react';

import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from 'react-router';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import { green } from '@material-ui/core/colors';

import TabChooser from './ui/TabChooser';
import WelcomeTab from './tabs/welcome';
import RegisterTab from './tabs/register';
import LoginTab from './tabs/login';
import ProfileTab from './tabs/profile';
import UsersTab from './tabs/listusers';
import { CssBaseline } from '@material-ui/core';

const darkTheme = createMuiTheme({
  palette: {
    primary: green,
    type: 'dark'
  },
  typography: { useNextVariants: true }
});

const defaultTheme = createMuiTheme({
  typography: { useNextVariants: true }
});

const App = () => {
  let initialUser; // replace this with code to read user from localStorage
  if (localStorage.hasOwnProperty('currentUser')) {
    initialUser = JSON.parse(localStorage.currentUser);
  }

  // eslint-disable-next-line
  let [currentUser, updateUser] = useState(initialUser);
  let [isDark, switchThemeFunc] = useState(false);
  return (
    <MuiThemeProvider theme={isDark ? darkTheme : defaultTheme}>
      <Router>
        <CssBaseline />
        <TabChooser changeTheme={switchThemeFunc}>
          <Route exact path="/" label="Welcome">
            <WelcomeTab label="Welcome" />
          </Route>
          <Route exact path="/register" label="Register">
            <RegisterTab label="Register" updateUser={updateUser} />
          </Route>
          <Route exact path="/login" label="Login">
            <LoginTab label="Login" updateUser={updateUser} />
          </Route>
          <Route exact path="/profile" label="Profile">
            <ProfileTab label="Profile" currentUser={currentUser} />
          </Route>
          <Route exact path="/listusers" label="Users">
            <UsersTab label="Users" />
          </Route>
        </TabChooser>
      </Router>
    </MuiThemeProvider>
  );
};

export default App;
