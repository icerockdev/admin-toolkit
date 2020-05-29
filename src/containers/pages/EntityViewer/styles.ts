/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { Theme } from '@material-ui/core';

export default (theme: Theme) => ({
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(500px, 1fr))',
  },
  wrap: {
    marginBottom: theme.spacing(4),
    margin: 0,
    '& .MuiFormControl-root': {
      width: '100%',
    },
  },
  field: {
    color: '#282f36',
    fontSize: '17px',
    fontWeight: 400,
    fontFamily: theme.typography.fontFamily,
    padding: `${theme.spacing(4)}px ${theme.spacing(3)}px`,
    boxShadow: '#e1e8ee 1px -1px',
    '& > .label': {
      display: 'block',
      color: '#a5b0bf',
      fontSize: '14px',
    },
    '& > .field': {
      marginTop: theme.spacing(1),
      display: 'block',
    },
  },
  loader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 200,
  },
  buttons: {
    gridColumnStart: 1,
    gridColumnEnd: -1,
  },
});
