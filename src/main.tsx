import "./index.css";
import ReactDOM from "react-dom/client";
import App from "./app";
import { styled, ThemeProvider } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";
import { MaterialDesignContent } from 'notistack'
import { NotificationProvider } from "@contexts/NotificationContext";
import { PaginationProvider } from "@contexts/PaginationContext";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import theme from "@styles/theme";
import "@styles/main.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({});

const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
  '&.notistack-MuiContent-success': {
    backgroundColor: '#2D7738',
  },
  '&.notistack-MuiContent-error': {
    backgroundColor: '#970C0C',
  },
}));

ReactDOM.createRoot(document.getElementById("root")!).render(
  <SnackbarProvider
    maxSnack={3}
    Components={{
      success: StyledMaterialDesignContent,
      error: StyledMaterialDesignContent,
    }}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
  >
    <NotificationProvider>
      <PaginationProvider>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
                <App />
                {/* <ReactQueryDevtools initialIsOpen={false} /> */}
            </QueryClientProvider>
          </ThemeProvider>
        </BrowserRouter>
      </PaginationProvider>
    </NotificationProvider>
  </SnackbarProvider>
);
