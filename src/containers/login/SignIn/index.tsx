/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, { FC, FormEvent, useCallback, useMemo, useState } from 'react';
import { Button, InputAdornment, TextField } from '@material-ui/core';

import { useConfig } from '~/application/utils/hooks';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";

const SignIn: FC = () => {
  const config = useConfig();
  const auth = config.auth;

  const onForgotPassword = useMemo(
    () =>
      config.auth?.authPasswRestoreFn
        ? () => {
            config.history.push('/restore');
          }
        : undefined,
    [config.history, config.auth, config.auth?.authPasswRestoreFn]
  );

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitCapture = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      auth!!.sendAuthRequest(email, password);
    },
    [email, password, auth]
  );

  const onEmailChange = useCallback((event) => setEmail(event.target.value), [
    setEmail,
  ]);

  const onPasswordChange = useCallback(
    (event) => setPassword(event.target.value),
    [setPassword]
  );

  const loginLabel = useMemo(() => config.auth?.loginLabel || 'Логин', [
    config.auth,
  ]);

  return (
    <div className={styles.wrap}>
      <Helmet>
        <title>Авторизация</title>
      </Helmet>

      <h3 className={styles.header}>Авторизация</h3>

      <form noValidate className={styles.form} onSubmit={onSubmitCapture}>
        <TextField
          variant="filled"
          margin="normal"
          required
          fullWidth
          id="email"
          label={loginLabel}
          name="email"
          autoComplete="email"
          defaultValue={email}
          onChange={onEmailChange}
          autoFocus
        />

        <TextField
          variant="filled"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Пароль"
          type="password"
          id="password"
          defaultValue={password}
          onChange={onPasswordChange}
          autoComplete="current-password"
          InputProps={{
            endAdornment: onForgotPassword ? (
              <InputAdornment
                position="end"
                onClick={onForgotPassword}
                className={styles.forgot}
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
          disabled={!email.length || !password.length}
          className={styles.button}
        >
          Войти
        </Button>

        {!!auth?.authSignupFn && (
          <Button
            type="button"
            fullWidth
            variant="outlined"
            color="primary"
            className={styles.button}
            component={Link}
            to="/signup"
          >
            Регистрация
          </Button>
        )}
      </form>
    </div>
  );
};

export { SignIn };
