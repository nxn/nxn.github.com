import React from 'react';
import { ThemeProvider } from "@emotion/react";
import { theme } from "./theme";

export default ({ element }) => (
    <ThemeProvider theme={ theme }>{element}</ThemeProvider>
);