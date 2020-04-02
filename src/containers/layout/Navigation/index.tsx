/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, { FC } from 'react';
import styles from './styles';
import { withStyles, AppBar, Toolbar, WithStyles } from '@material-ui/core';
import { Link, NavLink } from 'react-router-dom';
import { Account } from '../Account';

type IProps = WithStyles<typeof styles> & {
  logo?: { url?: string; title?: string };
  account?: { email?: string; username?: string; role?: string };
  links: { name: string; url: string }[];
  onLogout?: () => void;
};

const NavigationUnstyled: FC<IProps> = ({
  classes,
  logo,
  links,
  account,
  onLogout,
}) => {
  return (
    <AppBar position="static" className={classes.appbar}>
      <Toolbar className={classes.toolbar}>
        {logo && (
          <Link to="/" className={classes.title}>
            <img
              src={logo.url}
              title={logo.title}
              className={classes.logo}
              alt={logo.title}
            />
          </Link>
        )}

        {links && links.length > 0 && (
          <div className={classes.links}>
            {links.map(({ name, url }) => (
              <NavLink key={name} className={classes.link} to={url}>
                {name}
              </NavLink>
            ))}
          </div>
        )}

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
