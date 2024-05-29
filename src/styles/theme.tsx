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
            backgroundColor: '#f6eaea', // Background color
            '&:hover': {
              backgroundColor: '#f0d9d9', // Background color on hover
            },
            '&.Mui-focused': {
              backgroundColor: '#f6eaea', // Background color when focused
            },
            '&.Mui-error': {
              backgroundColor: '#ed2025', // Background color when there's an error
            },
            '&:before': {
              borderColor: '#ed2025', // Default bottom border color
            },
            '&:hover:not(.Mui-disabled):before': {
              borderColor: '#ed2025', // Bottom border color on hover
            },
            '&.Mui-focused:before': {
              borderColor: '#ed2025', // Bottom border color when focused
            },
            '&.Mui-error:before': {
              borderColor: '#ed2025r', // Bottom border color when there's an error
            },
          },
        },
      },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#22223b", // Customize the label color
          "&.Mui-focused": {
            color: "#ed2025", // Label color when focused
          },
          "&.Mui-error": {
            color: "#f6eaea", // Label color when there's an error
          },
        },
      },
    },
  },
});

export default theme;
