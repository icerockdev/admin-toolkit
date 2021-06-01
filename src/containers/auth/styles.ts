/* Copyright (c) 2020-2021 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { Theme, createStyles } from '@material-ui/core';

export default (theme: Theme) =>
  createStyles({
    wrap: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
    },
    paper: {
      padding: theme.spacing(4),
    },
    header: {
      // color: theme.palette.text,
      fontSize: '34px',
      fontWeight: 900,
    },
    marginTop: {
      marginTop: theme.spacing(4),
    },
    forgot: {
      cursor: 'pointer',

      '& > p': {
        fontSize: '12px',
        fontWeight: 400,
        color: theme.palette.text,
        opacity: 0.7,

        '&:hover': {
          opacity: 1,
        },
      },
    },
  });
