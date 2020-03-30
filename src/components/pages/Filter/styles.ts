/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { Theme } from '@material-ui/core';

export default (theme: Theme) => ({
  wrapper: {
    height: '36px',
    display: 'flex',
  },
  formControl: {
    margin: `0 ${theme.spacing(1)}px 0 0`,
    minWidth: 120,
  },
  select: {
    '& > div': {
      padding: '10px 14px 7px',
    },
  },
  input: {
    '& .select': {
      padding: '10px 34px 7px 14px',
    },
    '& input': {
      padding: '10px 14px 7px',
    },
    '& label': {
      transform: 'translate(10px, 12px) scale(0.9)',
    },
  },
  label: {
    transform: 'translate(10px, 12px) scale(0.9)',
  },
  iconButton: {
    height: '36px',
    width: '36px',
    padding: 0,
  },
});
