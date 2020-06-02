/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { Theme } from '@material-ui/core';

export default (theme: Theme) => ({
  loader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 200,
  },
  table: {
    '& td, & th': {
      padding: '4px 16px',
      fontSize: '12px',
      lineHeight: '14px',
    },
    '& tr': {
      height: '56px',
    },
    '& svg': {
      verticalAlign: 'middle',
    },
  },
  button: {
    boxSizing: 'border-box' as 'border-box',
    borderLeft: `1px solid rgba(0, 0, 0, 0.23)`,
    padding: '7px !important',

    '& a': {
      color: theme.palette.primary.main,
      minWidth: 'auto',
    },
  },
  button_active: {
    '& a': {
      background: theme.palette.primary.main,
      color: 'white',
      borderRadius: '4px',
      padding: '6px',

      '&:hover': {
        backgroundColor: theme.palette.primary.dark,
      },
    },
  },
});
