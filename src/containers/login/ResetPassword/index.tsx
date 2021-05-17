/* Copyright (c) 2020-2021 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, { FC, FormEvent, useCallback, useState } from 'react';
import { Button, TextField } from '@material-ui/core';

import { useRouteMatch } from 'react-router';
import { useConfig } from '~/application/utils/hooks';
import styles from './styles.module.scss';
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const ResetPassword: FC = () => {
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const matches = useRouteMatch<{ token: string }>();
  const config = useConfig();

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

      const token = matches.params.token;

      if (!config?.auth?.sendAuthPasswUpdate) return;

      if (password !== passwordRepeat) {
        config.notifications.showError("Passwords doesn't match");
        return;
      }

      config.auth.sendAuthPasswUpdate(token, password);
    },
    [config.auth, matches, passwordRepeat, password]
  );

  return (
    <div className={styles.wrap}>
      <Helmet>
        <title>Восстановление пароля</title>
      </Helmet>

      <h3 className={styles.header}>Введите новый пароль</h3>

      <form noValidate onSubmit={onSubmitCapture}>
        <TextField
          variant="filled"
          margin="normal"
          required
          fullWidth
          id="password"
          label="Password"
          name="password"
          defaultValue={password}
          onChange={onPasswordChange}
          autoFocus
        />

        <TextField
          variant="filled"
          margin="normal"
          required
          fullWidth
          id="password"
          label="Password repeat"
          name="passwordRepeat"
          defaultValue={passwordRepeat}
          onChange={onPasswordRepeatChange}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={
            !password.length ||
            !passwordRepeat.length ||
            password !== passwordRepeat
          }
          className={styles.button}
        >
          Восстановить
        </Button>

        <Button
          type="button"
          component={Link}
          to="/"
          variant="text"
          fullWidth
          className={styles.cancel}
        >
          Отмена
        </Button>
      </form>
    </div>
  );
};

export { ResetPassword };
