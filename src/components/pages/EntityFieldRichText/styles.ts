/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { Theme } from '@material-ui/core';

export default (theme: Theme) => ({
  formControl: {
    margin: `${theme.spacing(2)}px 0 ${theme.spacing(1)}px`,
    minWidth: 120,
    '& #description-editor': {
      padding: `0 ${theme.spacing(2)}px`,
      borderTop: '1px solid #c4c4c4',
      width: '100%',
    },
    '& #description-container > div:nth-child(2)': {
      padding: `${theme.spacing(2)}px`,
      borderTop: '1px solid #c4c4c4',
      minHeight: '250px',
    },
    '& #description-root': {
      width: '100%',
      minHeight: '300px',
    },
  },
});
