/* Copyright (c) 2020-2021 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, { FC, FormEvent, useCallback, useState } from 'react';
import { Button, TextField } from '@material-ui/core';

import { useRouteMatch } from 'react-router';
import { useConfig } from '~/application/utils/hooks';
import styles from './styles.module.scss';
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

const ResetPassword: FC = () => {
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const matches = useRouteMatch<{ token: string }>();
  const config = useConfig();
  const {t} = useTranslation();

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
    [matches.params.token, config, password, passwordRepeat]
  );

  return (
    <div className={styles.wrap}>
      <Helmet>
        <title>{t('Password recovery')}</title>
      </Helmet>

      <h3 className={styles.header}>{t('Enter a new password')}</h3>

      <form noValidate onSubmit={onSubmitCapture}>
        <TextField
          variant="filled"
          margin="normal"
          required
          fullWidth
          id="password"
          label={t('Password')}
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
          label={t('Password repeat')}
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
          {t('Restore')}
        </Button>

        <Button
          type="button"
          component={Link}
          to="/"
          variant="text"
          fullWidth
          className={styles.cancel}
        >
          {t('buttons:Cancel')}
        </Button>
      </form>
    </div>
  );
};

export { ResetPassword };
