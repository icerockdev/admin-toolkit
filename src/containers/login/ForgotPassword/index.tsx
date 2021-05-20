/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, { FC, FormEvent, useCallback, useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import { useConfig } from '~/application/utils/hooks';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

const ForgotPassword: FC = () => {
  const [email, setEmail] = useState('');
  const config = useConfig();
  const {t} = useTranslation();

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

      config.auth.sendAuthPasswRestore(email);
    },
    [config, email]
  );

  return (
    <div className={styles.wrap}>
      <Helmet>
        <title>{t('Password recovery')}</title>
      </Helmet>

      <h3 className={styles.header}>{t('Password recovery')}</h3>

      <form noValidate onSubmit={onSubmitCapture}>
        <TextField
          variant="filled"
          margin="normal"
          required
          fullWidth
          id="email"
          label={t('Email')}
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

export { ForgotPassword };
