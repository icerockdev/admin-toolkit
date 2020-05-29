/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { Theme } from '@material-ui/core';

export default (theme: Theme) => ({
  header: {
    margin: '5px 0',
    display: 'flex',
    justifyContent: 'center',
    padding: '10px 24px',

    '& > *': {
      margin: '5px 0',
    },
  },
  title: {
    color: '#282f36',
    fontSize: '34px',
    fontWeight: 900,
    flexGrow: 1,
  },
  buttons: {
    marginRight: theme.spacing(1),
  },
  export: {
    marginRight: theme.spacing(1),
  },
});
