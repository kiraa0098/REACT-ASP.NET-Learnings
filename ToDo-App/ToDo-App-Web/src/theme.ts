import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light', // Ensure light mode is explicitly set
    background: {
      default: '#f5f5f5', // Soft grey for the main background
      paper: '#ffffff', // White for cards and other paper-like surfaces
    },
    text: {
      primary: '#213547', // Dark slate gray for primary text
      secondary: 'rgba(33, 53, 71, 0.7)', // Slightly lighter for secondary text
    },
    primary: {
      main: '#424242', // Dark grey for primary actions
    },
    secondary: {
      main: '#616161', // A slightly different shade of grey
    },
  },
  typography: {
    fontFamily: [
      'cursive',
      'system-ui',
      'Avenir',
      'Helvetica',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none', // Prevent uppercase by default
          '&:focus-visible': {
            outline: 'none',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          // You can add global text field styles here if needed
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          '&:focus-visible': {
            outline: 'none',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&:focus-visible': {
            outline: 'none',
          },
        },
      },
    },
    // Add other component overrides as needed for consistent look and feel
  },
});

export default theme;
