/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, { FC, useCallback, useMemo, useState } from 'react';
import { useConfig } from '~/application';
import styles from './styles.module.scss';
import { Button, TextField } from '@material-ui/core';
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

interface IProps {
}

const SignUp: FC<IProps> = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const config = useConfig();
  const {t} = useTranslation();
  const auth = config.auth!!;

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      auth.sendAuthSignup({
        email,
        password,
      });
    },
    [auth, email, password]
  );

  const onEmailChange = useCallback((event) => setEmail(event.target.value), [
    setEmail,
  ]);

  const onPasswordChange = useCallback(
    (event) => setPassword(event.target.value),
    [setPassword]
  );

  const loginLabel = useMemo(() => config.auth?.loginLabel || t('Login'), [config.auth, t]);

  return (
    <div className={styles.wrap}>
      <Helmet>
        <title>{t('Sign Up')}</title>
      </Helmet>

      <h3 className={styles.header}>{t('Sign Up')}</h3>

      <form onSubmit={onSubmit}>
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
          label={t('Password')}
          type="password"
          id="password"
          defaultValue={password}
          onChange={onPasswordChange}
          autoComplete="current-password"
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={!email.length || !password.length}
          className={styles.button}
        >
          {t('Register now')}
        </Button>

        <Button
          type="button"
          component={Link}
          to="/"
          variant="text"
          fullWidth
          className={styles.cancel}
        >
          {t('Cancel')}
        </Button>
      </form>
    </div>
  );
};

export { SignUp };
