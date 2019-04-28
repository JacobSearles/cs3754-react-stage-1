import React, { useState, useEffect } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
//import Switch from '@material-ui/core/Switch';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Drawer from '@material-ui/core/Drawer';
import ListItemText from '@material-ui/core/ListItemText';
//import Typography from '@material-ui/core/Typography';

import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { withStyles } from '@material-ui/core/styles';

import { withRouter, Switch as RRSwitch } from 'react-router';
import { Link as RRLink } from 'react-router-dom';
import { Typography } from '@material-ui/core';

/* props.children is a reference to the child elements of this components, e.g. what's
 * inside
 * <TabChooser>
 *   <Child1 .. />
 *   <Child2 .. />
 * </TabChooser>
 */
const TabChooser = ({
  classes,
  user,
  children,
  changeTheme,
  location,
  history
}) => {
  let tabs = children.filter(tab => tab && !tab.props.hideIf); // consider only non-null children

  function findCurrentTabBasedOnPath(location) {
    const selectedTab = tabs.findIndex(
      tab => tab.props.path === location.pathname
    );
    return selectedTab === -1 ? 0 : selectedTab;
  }
  const [currentTab, selectTab] = useState(() =>
    findCurrentTabBasedOnPath(location)
  );
  useEffect(() => {
    // returns unlisten function which is called as cleanup on unmount
    return history.listen(location => {
      selectTab(findCurrentTabBasedOnPath(location));
    });
  }, []);
  let [drawerOpen, setDrawerOpen] = useState(false);

  /*
  let [themeSwitchState, setThemeSwitch] = useState(false);
  function handleChange(state) {
    setThemeSwitch(state);
    changeTheme(state);
  }
  */

  let drawerContent = (
    <div className="classes.mainMenuList">
      <MenuList>
        {tabs.map(tab => (
          <MenuItem
            component={RRLink}
            key={tab.props.path}
            to={tab.props.path}
            onClick={() => setDrawerOpen(false)}
          >
            <ListItemText inset={false} primary={tab.props.label} />
          </MenuItem>
        ))}
      </MenuList>
    </div>
  );

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            className={classes.mainMenuButton}
            color="inherit"
            aria-label="Menu"
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>

          <Tabs
            value={currentTab}
            onChange={(_event, value) => selectTab(value)}
          >
            {tabs.map((tab, i) => (
              <Tab
                key={tab.props.label}
                label={tab.props.label}
                component={RRLink}
                to={tab.props.path}
              />
            ))}
          </Tabs>
          <Typography align="right" color="inherit" style={{ flexGrow: 1 }} />
          {/*
          <Typography align="right" color="inherit" style={{ flexGrow: 1 }}>
            Change Theme
          </Typography>
          <Switch
            value={themeSwitchState}
            onChange={event => handleChange(event.target.checked)}
          />
          */}
          {user.authenticated ? (
            <Tooltip title={`Edit your Profile`}>
              <IconButton
                component={RRLink}
                to={`/profile/edit/${user.id}`}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Tooltip>
          ) : null}
          {user.authenticated ? (
            <Tooltip title={<p>Logged on as {user.username}</p>}>
              <Button component={RRLink} to={'/logout'} color="inherit">
                Logout
              </Button>
            </Tooltip>
          ) : (
            <Button component={RRLink} to={'/login'} color="inherit">
              Login
            </Button>
          )}
          {!user.authenticated ? (
            <Button component={RRLink} to={'/register'} color="inherit">
              Register
            </Button>
          ) : (
            <></>
          )}
        </Toolbar>
        <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          {drawerContent}
        </Drawer>
      </AppBar>
      <RRSwitch>{children}</RRSwitch>
    </>
  );
};

// required/recommended styling for IconButton in AppBar as per documentation
// https://material-ui.com/demos/app-bar/
const styles = theme => ({
  mainMenuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  mainMenuList: {
    width: 200
  }
});

export default withStyles(styles)(withRouter(TabChooser));
