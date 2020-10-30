import React, { FC, useCallback, useState } from 'react';
import { useConfig } from '~/application';
import styles from './styles.module.scss';
import { Button, InputAdornment, TextField } from '@material-ui/core';

interface IProps {}

const SignUp: FC<IProps> = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const config = useConfig();
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

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <h3 className={styles.header}>Регистрация</h3>

      <TextField
        variant="filled"
        margin="normal"
        required
        fullWidth
        id="email"
        label={auth.loginLabel}
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
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        disabled={!email.length || !password.length}
        className={styles.button}
      >
        Зарегистрироваться
      </Button>
    </form>
  );
};

export { SignUp };
