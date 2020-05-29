/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { Theme } from '@material-ui/core';

export default (theme: Theme) => ({
  header: {
    margin: '5px 0',
    display: 'flex',
    justifyContent: 'center',
    padding: '10px 24px',
    alignItems: 'flex-start' as 'flex-start',
    flexWrap: 'nowrap' as 'nowrap',

    '& h4': {
      whiteSpace: 'nowrap',
    },

    '& > *': {
      margin: '5px 0',
    },
  },
  title: {
    color: '#282f36',
    fontSize: '34px',
    fontWeight: 900,
    flexGrow: 1,
    whiteSpace: 'nowrap' as 'nowrap',
  },
  buttons: {
    marginRight: theme.spacing(1),
    flexWrap: 'nowrap' as 'nowrap',
    display: 'flex' as 'flex',
  },
  export: {
    marginRight: theme.spacing(1),
  },
});
