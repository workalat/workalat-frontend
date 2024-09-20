import { createTheme } from '@mui/material/styles';

import { fontSans, fontMono } from './fonts';

const theme = createTheme({
  typography: {
    fontFamily: fontMono.variable,
    body1: fontSans.variable,
    button: fontMono.variable,
    caption: fontSans.variable,
  },
  palette: {
    primary: {
      main: '#ffbe00', 
    },
    secondary: {
      main: '#07242b',
    },
  },
});

export default theme;