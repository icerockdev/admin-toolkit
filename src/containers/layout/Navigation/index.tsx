/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, { FC, useState, useMemo, useEffect, useCallback } from 'react';
import styles from './styles';
import {
  withStyles,
  AppBar,
  Toolbar,
  WithStyles,
  Tabs,
  Tab,
} from '@material-ui/core';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { Account } from '../Account';
import classnames from 'classnames';

type IProps = WithStyles<typeof styles> & {
  logo?: { url?: string; title?: string };
  account?: { email?: string; username?: string; role?: string };
  links: { name: string; url: string }[];
  onLogout?: () => void;
};

const LinkTab = (props: any) => (
  <Tab
    component="a"
    onClick={(event: any) => {
      event.preventDefault();
    }}
    {...props}
  />
);

const NavigationUnstyled: FC<IProps> = ({
  classes,
  logo,
  links,
  account,
  onLogout,
}) => {
  const history = useHistory();
  const [location, setLocation] = useState(window.location.pathname.toString());

  useEffect(() => {
    history.listen(() => setLocation(history.location.pathname));
  }, [history]);

  const onTabChange = useCallback((_, tab) => history.push(links[tab].url), [
    history,
  ]);

  const activeTab = useMemo(
    () => links.findIndex((link) => link.url === location) || 0,
    [location]
  );

  return (
    <AppBar position="static" className={classes.appbar}>
      <Toolbar className={classes.toolbar}>
        {logo && (
          <Link to="/" className={classnames('logo', classes.title)}>
            <img
              src={logo.url}
              title={logo.title}
              className={classes.logo}
              alt={logo.title}
            />
          </Link>
        )}

        <Tabs
          onChange={onTabChange}
          value={activeTab}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
          className={classes.tabs}
        >
          {links.map(({ name, url }) => (
            <Tab label={name} key={url} className={classes.tab} />
          ))}
        </Tabs>

        {account && (
          <Account
            email={account.email}
            username={account.username}
            role={account.role}
            onLogout={onLogout}
          />
        )}
      </Toolbar>
    </AppBar>
  );
};

const Navigation = withStyles(styles, { withTheme: true })(NavigationUnstyled);

export { Navigation };
