import React from "react";
import { addDecorator } from "@storybook/react";
import { ThemeProvider, CssBaseline } from "@material-ui/core";
import { DEFAULT_THEME } from "~/styles";
import { Router } from "react-router-dom";
import { createBrowserHistory } from 'history';

addDecorator(storyFn => (
  <ThemeProvider theme={DEFAULT_THEME}>
    <CssBaseline />
    {storyFn()}
  </ThemeProvider>
));
