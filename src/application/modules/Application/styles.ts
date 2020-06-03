/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { Theme } from '@material-ui/core';

export default (theme: Theme) => ({
  wrapper: {
    padding: 0,

    '& .MuiButton-root, & .MuiOutlinedInput-root': {
      borderRadius: 0,
    },
  },
});
