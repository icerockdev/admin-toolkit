/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, { FC, FormEvent, useCallback, useState } from 'react';
import { Button, TextField, Typography } from '@material-ui/core';
import { useConfig } from '~/utils/hooks';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';

const ForgotPassword: FC = () => {
  const config = useConfig();
  const [email, setEmail] = useState('');

  const onEmailChange = useCallback(
    (event) => {
      setEmail(event.target.value);
    },
    [setEmail]
  );

  const onSubmitCapture = useCallback(
    (event: FormEvent) => {
      event.preventDefault();

      if (!config?.auth?.sendAuthPasswRestore) return;

      config.auth.sendAuthPasswRestore({ email });
    },
    [email, config.auth]
  );

  return (
    <div className={styles.wrap}>
      <form noValidate onSubmit={onSubmitCapture} className={styles.form}>
        <h3 className={styles.header}>Восстановление пароля</h3>

        <TextField
          variant="filled"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
          defaultValue={email}
          onChange={onEmailChange}
          autoFocus
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={!email.length}
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

export { ForgotPassword };
