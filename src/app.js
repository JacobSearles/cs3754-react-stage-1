import React, { useState } from 'react';

import TabChooser from './ui/TabChooser';
import WelcomeTab from './tabs/welcome';
import RegisterTab from './tabs/register';

const App = () => {
  let initialUser = { }; // replace this with code to read user from localStorage

  // eslint-disable-next-line
  let [currentUser, updateUser ] = useState(initialUser);
  return (
    <TabChooser>
      <WelcomeTab label="Welcome" />
      <RegisterTab label="Register" updateUser={updateUser} />
    </TabChooser>);
}

export default App;
