/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, { FC, FormEvent, useCallback, useState } from 'react';
import { Button, TextField } from '@material-ui/core';

import { useRouteMatch } from 'react-router';
import { useConfig } from '~/utils/hooks';
import styles from './styles.module.scss';

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

      config.auth.sendAuthPasswUpdate({ token, password, passwordRepeat });
    },
    [config.auth, matches, passwordRepeat, password]
  );

  return (
    <div className={styles.wrap}>
      <form noValidate onSubmit={onSubmitCapture} className={styles.form}>
        <h3 className={styles.header}>Введите новый пароль</h3>

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
      </form>
    </div>
  );
};

export { ResetPassword };
