import React from 'react';
import { addDecorator } from '@storybook/react';
import { ThemeProvider, CssBaseline, createMuiTheme } from '@material-ui/core';
import { DEFAULT_THEME } from '~/styles';

addDecorator((storyFn) => (
  <ThemeProvider theme={createMuiTheme(DEFAULT_THEME)}>
    <CssBaseline />
    {storyFn()}
  </ThemeProvider>
));
