/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { Theme } from '@material-ui/core';

export default (theme: Theme) => ({
  header: {
    marginBottom: theme.spacing(2),
  },
  title: {
    color: '#282f36',
    fontSize: '34px',
    fontWeight: 900,
    flexGrow: 1,
  },
});
