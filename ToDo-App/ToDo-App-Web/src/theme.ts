import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
    text: {
      primary: "#213547",
      secondary: "rgba(33, 53, 71, 0.7)",
    },
    primary: {
      main: "#424242",
    },
    secondary: {
      main: "#616161",
    },
  },
  typography: {
    fontFamily: [
      "cursive",
      "system-ui",
      "Avenir",
      "Helvetica",
      "Arial",
      "sans-serif",
    ].join(","),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none", // Prevent uppercase by default
          "&:focus-visible": {
            outline: "none",
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
          "&:focus-visible": {
            outline: "none",
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          "&:focus-visible": {
            outline: "none",
          },
        },
      },
    },
    // Add other component overrides as needed for consistent look and feel
  },
});

export default theme;
