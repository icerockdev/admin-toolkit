/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, { FC, useCallback, FormEvent, useState } from 'react';
import {
  Typography,
  Paper,
  TextField,
  Button,
  withStyles,
  WithStyles,
  Container,
} from '@material-ui/core';

import styles from '../styles';

type IProps = WithStyles<typeof styles> & {
  onSubmit?: (props: {
    token: string;
    password: string;
    passwordRepeat: string;
  }) => void;
  token: string;
};

const ResetPasswordUnstyled: FC<IProps> = ({ classes, onSubmit, token }) => {
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');

  const onPasswordChange = useCallback(
    (event) => {
      setPassword(event.target.value);
    },
    [setPassword]
  );

  const onPasswordRepeatChange = useCallback(
    (event) => {
      setPasswordRepeat(event.target.value);
    },
    [setPasswordRepeat]
  );

  const onSubmitCapture = useCallback(
    (event: FormEvent) => {
      event.preventDefault();

      if (!onSubmit) return;

      onSubmit({ token, password, passwordRepeat });
    },
    [onSubmit, token, passwordRepeat, password]
  );

  return (
    <div className={classes.wrap}>
      <Container component="main" maxWidth="sm">
        <Paper className={classes.paper}>
          <Typography align="center" component="h3" className={classes.header}>
            Введите новый пароль
          </Typography>

          <form noValidate onSubmit={onSubmitCapture}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              className={classes.marginTop}
              defaultValue={password}
              onChange={onPasswordChange}
              autoFocus
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password repeat"
              name="passwordRepeat"
              className={classes.marginTop}
              defaultValue={passwordRepeat}
              onChange={onPasswordRepeatChange}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.marginTop}
              disabled={
                !password.length ||
                !passwordRepeat.length ||
                password !== passwordRepeat
              }
            >
              Восстановить
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

const ResetPassword = withStyles(styles, { withTheme: true })(
  ResetPasswordUnstyled
);

export { ResetPassword };
