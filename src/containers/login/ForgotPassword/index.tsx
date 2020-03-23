/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, {
  FC,
  ChangeEventHandler,
  FormEventHandler,
  useCallback,
  FormEvent,
} from 'react';
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
  email: string;
  onEmailChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onSubmit: FormEventHandler;
};

const ForgotPasswordUnstyled: FC<IProps> = ({
  classes,
  email,
  onEmailChange,
  onSubmit,
}) => {
  const onSubmitCapture = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      onSubmit(event);
    },
    [onSubmit]
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
