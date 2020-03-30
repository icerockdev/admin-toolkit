import React, { FC, useCallback } from 'react';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { INotification } from '~/application/types/notification';

interface IProps {
  hideNotification: () => void;
  show: INotification['show'];
  type: INotification['type'];
  message: INotification['message'];
  timeout: INotification['timeout'];
}

const Notification: FC<IProps> = ({
  hideNotification,
  show,
  type,
  message,
  timeout,
}) => {
  const onClose = useCallback(
    (...args) => {
      console.log(args);
      hideNotification();
    },
    [hideNotification]
  );

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      key="bottom,left"
      open={show}
      onClose={onClose}
      autoHideDuration={timeout}
    >
      <Alert
        elevation={6}
        variant="filled"
        onClose={onClose}
        severity={type || 'info'}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export { Notification };
