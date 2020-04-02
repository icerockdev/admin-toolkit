/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, {
  FC,
  MouseEventHandler,
  FormEvent,
  useCallback,
  useState,
} from 'react';

import {
  Paper,
  Typography,
  TextField,
  withStyles,
  InputAdornment,
  Button,
  WithStyles,
  Container,
} from '@material-ui/core';

import styles from '../styles';

type IProps = WithStyles<typeof styles> & {
  onForgotScreenClick?: MouseEventHandler;
  onSubmit: ({ email, password }: { email: string; password: string }) => void;
};

const SignInUnstyled: FC<IProps> = ({
  classes,
  onForgotScreenClick,
  onSubmit,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitCapture = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      onSubmit({ email, password });
    },
    [email, password, onSubmit]
  );

  const onEmailChange = useCallback((event) => setEmail(event.target.value), [
    setEmail,
  ]);

  const onPasswordChange = useCallback(
    (event) => setPassword(event.target.value),
    [setPassword]
  );

  return (
    <div className={classes.wrap}>
      <Container component="main" maxWidth="sm">
        <Paper className={classes.paper}>
          <Typography align="center" component="h3" className={classes.header}>
            Авторизация
          </Typography>

          <form noValidate onSubmit={onSubmitCapture}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              className={classes.marginTop}
              autoComplete="email"
              defaultValue={email}
              onChange={onEmailChange}
              autoFocus
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Пароль"
              type="password"
              id="password"
              className={classes.marginTop}
              defaultValue={password}
              onChange={onPasswordChange}
              autoComplete="current-password"
              InputProps={{
                endAdornment: onForgotScreenClick ? (
                  <InputAdornment
                    position="end"
                    onClick={onForgotScreenClick}
                    className={classes.forgot}
                  >
                    Забыли пароль?
                  </InputAdornment>
                ) : null,
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.marginTop}
              disabled={!email.length || !password.length}
            >
              Войти
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

const SignIn = withStyles(styles, { withTheme: true })(SignInUnstyled);

export { SignIn };
