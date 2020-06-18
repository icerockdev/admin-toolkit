/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { Theme } from '@material-ui/core';

export default (theme: Theme) => ({
  formControl: {
    margin: `${theme.spacing(2)}px 0 ${theme.spacing(1)}px`,
    minWidth: 120,

    '& input': {
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      opacity: 0,
    },
  },
  outlinedInput: {
    minHeight: '56px',
    alignItems: 'inherit',
  },
  label: {
    display: 'flex',

    '& > img': {
      marginRight: '10px',
    },
  },
  image: {
    flex: '0 0 56px',
    width: 56,
    height: 56,
    backgroundSize: 'cover',
    backgroundPosition: '50% 50%',
    backgroundColor: '#eeeeee',
  },
  preview: {
    maxWidth: '100%',
    maxHeight: 300,
  },
});
