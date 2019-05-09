import React, { useState } from 'react';

import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from 'react-router';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import { green } from '@material-ui/core/colors';
import { CssBaseline, Typography } from '@material-ui/core';

import TabChooser from './ui/TabChooser';
import WelcomeTab from './tabs/welcome';
import RegisterTab from './tabs/register';
import LoginTab from './tabs/login';
import ProfileTab from './tabs/profile';
import UsersTab from './tabs/listusers';
import EditProfileTab from './tabs/editprofile';
import ListQuestionsTab from './tabs/surveys';
import QuestionTab from './tabs/question';
import NewQuestionTab from './tabs/newquestion';
import EditQuestionTab from './tabs/editquestion';

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
  // eslint-disable-next-line
  let [currentUser, updateUser] = useState(() => {
    try {
      const token = localStorage.getItem('token');
      const [, payload] = token.split(/\./);
      const decodedpayload = atob(payload); // base64 decode
      let { id, username, firstname, lastname, email, admin } = JSON.parse(
        decodedpayload
      ).data;
      return {
        id,
        username,
        firstname,
        lastname,
        email,
        admin,
        authenticated: true
      };
    } catch {
      return { authenticated: false };
    }
  });
  let [currentQuestion, updateQuestion] = useState(null);
  let [isDark, switchThemeFunc] = useState(false);
  let [currentQuestions, updateQuestions] = useState([]);
  let [currentUsers, updateUsers] = useState([]);
  return (
    <MuiThemeProvider theme={isDark ? darkTheme : defaultTheme}>
      <Router>
        <CssBaseline />
        <TabChooser changeTheme={switchThemeFunc} user={currentUser}>
          <Route exact path="/" label="Welcome" component={WelcomeTab} />
          <Route
            exact
            path="/login"
            label="Login"
            hideIf={true}
            render={() => (
              <LoginTab updateUser={updateUser} currentUser={currentUser} />
            )}
          />
          <Route
            exact
            path="/logout"
            hideIf={true}
            render={() => {
              localStorage.removeItem('token');
              window.location.href = `${process.env.PUBLIC_URL}/`;
              return (
                <Typography variant="body2">Logging you out...</Typography>
              );
            }}
          />
          <Route
            exact
            path={`/profile/edit/${currentUser.id}`}
            label="Edit Profile"
            hideIf={true}
            render={() => (
              <EditProfileTab
                currentUser={currentUser}
                updateUser={updateUser}
              />
            )}
          />
          <Route
            exact
            path="/register"
            label="register"
            hideIf={true}
            render={() => <RegisterTab updateUser={updateUser} />}
          />
          <Route
            exact
            path="/profile"
            label="Profile"
            hideIf={!currentUser.authenticated}
            render={() => <ProfileTab currentUser={currentUser} />}
          />
          <Route
            exact
            path="/listusers"
            label="List Users"
            hideIf={!currentUser.admin}
            render={() => (
              <UsersTab
                label="List Users"
                currentUser={currentUser}
                currentUsers={currentUsers}
                updateUsers={updateUsers}
              />
            )}
          />
          <Route
            exact
            path="/questions"
            label="Surveys"
            hideIf={!currentUser.authenticated}
            render={() => (
              <ListQuestionsTab
                currentUser={currentUser}
                currentQuestions={currentQuestions}
                updateQuestions={updateQuestions}
              />
            )}
          />
          <Route
            exact
            path="/question/new"
            label="New Question"
            hideIf={true}
            render={() => (
              <NewQuestionTab
                currentUser={currentUser}
                updateQuestions={updateQuestions}
              />
            )}
          />
          <Route
            exact
            path="/question/edit/:id"
            label="Edit Question"
            hideIf={true}
            render={() => (
              <EditQuestionTab
                label="Edit Question"
                currentUser={currentUser}
              />
            )}
          />
          <Route
            exact
            path="/question/:id"
            label="Question"
            hideIf={true}
            render={() => (
              <QuestionTab currentUser={currentUser} url="question/" />
            )}
          />
        </TabChooser>
      </Router>
    </MuiThemeProvider>
  );
};

export default App;
