import React from "react";
import { addDecorator } from "@storybook/react";
import { ThemeProvider, CssBaseline } from "@material-ui/core";
import { DEFAULT_THEME } from "~/styles";

addDecorator(storyFn => (
  <ThemeProvider theme={DEFAULT_THEME}>
    <CssBaseline />
    {storyFn()}
  </ThemeProvider>
));
