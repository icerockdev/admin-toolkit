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
  onSubmit?: ({ email }: { email: string }) => void;
};

const ForgotPasswordUnstyled: FC<IProps> = ({ classes, onSubmit }) => {
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

      if (!onSubmit) return;

      onSubmit({ email });
    },
    [onSubmit, email]
  );

  return (
    <div className={classes.wrap}>
      <Container component="main" maxWidth="sm">
        <Paper className={classes.paper}>
          <Typography align="center" component="h3" className={classes.header}>
            Восстановление пароля
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

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.marginTop}
              disabled={!email.length}
            >
              Восстановить
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

const ForgotPassword = withStyles(styles, { withTheme: true })(
  ForgotPasswordUnstyled
);

export { ForgotPassword };
