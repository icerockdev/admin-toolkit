/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { Theme } from '@material-ui/core';

export default (theme: Theme) => ({
  input: {
    '& input': {
      padding: '10px 14px 7px',
    },
    '& label': {
      transform: 'translate(10px, 12px) scale(0.9)',
    },
  },
});
