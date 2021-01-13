/* Copyright (c) 2020-2021 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { Theme } from '@material-ui/core';

export default (theme: Theme) => ({
  header: {
    display: 'flex',
    padding: '10px',
    justifyContent: 'center',
    alignItems: 'flex-start' as 'flex-start',
    flexWrap: 'nowrap' as 'nowrap',
    minHeight: '80px',

    '@media(max-width: 640px)': {
      flexDirection: 'column' as 'column',
    },

    '& .MuiButton-label': {
      fontWeight: 'bold',
      fontSize: '14px',
      lineHeight: '16px',
      height: 38,
    },

    '& .MuiInputBase-input': {},

    '& .MuiButton-outlinedPrimary, & .MuiButton-outlinedSecondary': {
      backgroundColor: 'white',
      border: '1px solid #EBEBEB !important',
    },

    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },

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

    '@media(max-width: 640px)': {
      width: '100%',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      paddingRight: 10,
    },
  },
  export: {
    marginRight: theme.spacing(1),
  },
});
