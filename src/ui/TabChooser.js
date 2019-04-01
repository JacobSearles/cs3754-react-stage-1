import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Switch from '@material-ui/core/Switch';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItemText from '@material-ui/core/ListItemText';
import { Link as RRLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import { Tabs, Tab } from '@material-ui/core';

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

const TabChooser = ({ changeTheme, children, location, classes, history }) => {
  function tab(location) {
    const selectedTab = children.findIndex(
      tab => tab.props.path === location.pathname
    );
    return selectedTab === -1 ? 0 : selectedTab;
  }

  const [currentTab, selectTab] = useState(() => {
    const selectedTab = children.findIndex(
      tab => tab.props.path === location.pathname
    );
    return selectedTab === -1 ? 0 : selectedTab;
  });

  history.listen(location => {
    selectTab(tab(location));
  });

  let [menuOpen, toggleMenu] = useState(false);

  const selectedTab = children[currentTab];
  let [themeSwitchState, setThemeSwitch] = useState(false);

  function handleChange(state) {
    setThemeSwitch(state);
    changeTheme(state);
  }

  let menuStuff = (
    <div className="classes.mainMenuList">
      <MenuList>
        {children.map(tab => (
          <MenuItem
            component={RRLink}
            to={tab.props.path}
            key={tab.props.path}
            onClick={() => toggleMenu(false)}
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
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
            onClick={() => toggleMenu(true)}
          >
            <MenuIcon />
          </IconButton>
          <Tabs
            value={currentTab}
            onChange={(_event, value) => selectTab(value)}
          >
            {children.map((tab, i) => (
              <Tab
                component={RRLink}
                to={tab.props.path}
                key={tab.props.label}
                label={tab.props.label}
              />
            ))}
          </Tabs>

          <Typography align="right" color="inherit" style={{ flexGrow: 1 }}>
            Change Theme
          </Typography>
          <Switch
            value={themeSwitchState}
            onChange={event => handleChange(event.target.checked)}
          />
        </Toolbar>
        <Drawer open={menuOpen} onClose={() => toggleMenu(false)}>
          {menuStuff}
        </Drawer>
      </AppBar>
      {React.cloneElement(selectedTab)}
    </>
  );
};

export default withRouter(withStyles(styles)(TabChooser));
