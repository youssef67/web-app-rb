import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Roboto",
    body1: {
      color: "#f6eaea",
    },
  },

  palette: {
    primary: {
      main: "#22223b",
    },
    secondary: {
      main: "#ed2025",
    },
    background: {
      default: "#22223b",
    },
    divider: "#f6eaea",
  },
  components: {
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: '#f6eaea',
          '&:hover': {
            backgroundColor: '#f0d9d9',
          },
          '&.Mui-focused': {
            backgroundColor: '#f6eaea',
          },
          '&:before': {
            borderColor: '#ed2025',
          },
          '&:hover:not(.Mui-disabled):before': {
            borderColor: '#ed2025',
          },
          '&.Mui-focused:before': {
            borderColor: '#ed2025',
          },
          '&.Mui-error:before': {
            borderColor: '#ed2025',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#22223b",
          "&.Mui-error": {
            color: "#22223b",
          },
        },
      },
    },
  },
});

export default theme;
