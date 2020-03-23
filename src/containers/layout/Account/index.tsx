/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, { FC, useCallback, useState, useRef } from 'react';
import {
  IconButton,
  WithStyles,
  withStyles,
  Menu,
  MenuItem,
  Typography,
} from '@material-ui/core';

import styles from './styles';
import { Link } from 'react-router-dom';

type IProps = WithStyles<typeof styles> & {
  email?: string;
  role?: string;
  onLogout?: () => void;
};

const AccountUnstyled: FC<IProps> = ({ classes, email, role, onLogout }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const onMenuOpen = useCallback(() => setIsMenuOpen(true), [setIsMenuOpen]);
  const onMenuClose = useCallback(() => setIsMenuOpen(false), [setIsMenuOpen]);

  return (
    <div className={classes.account} ref={ref}>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={onMenuOpen}
        color="inherit"
      >
        <span className={classes.accountCircle}>
          {(email && email.charAt(0)) || ''}
        </span>
      </IconButton>

      <Menu
        id="menu-appbar"
        anchorEl={ref.current}
        keepMounted
        open={isMenuOpen}
        onClose={onMenuClose}
      >
        <MenuItem>
          <div>
            {email && <Typography component="div">{email}</Typography>}
            {role && (
              <Typography
                component="span"
                variant="caption"
                color="textSecondary"
              >
                {role}
              </Typography>
            )}
          </div>
        </MenuItem>

        <MenuItem component={Link} onClick={onLogout} to="/logout">
          <Typography component="span" color="primary">
            Выход из аккаунта
          </Typography>
        </MenuItem>
      </Menu>
    </div>
  );
};

const Account = withStyles(styles)(AccountUnstyled);

export { Account };
