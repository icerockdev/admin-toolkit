/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { Theme } from '@material-ui/core';

export default (theme: Theme) => ({
  wrapper: {
    padding: 0,

    '& .MuiButton-root, & .MuiOutlinedInput-root': {
      borderRadius: 0,
    },

    '& .datepicker .MuiFormHelperText-contained ': {
      position: 'absolute',
      top: -13,
      left: 0,
      whiteSpace: 'nowrap',
    },

    '& .datepicker_range input': {
      width: 90,
    },

    '& .datepicker_datetime input': {
      width: 130,
    },

    '& .datepicker_date input': {
      width: 90,
    },
  },
});
