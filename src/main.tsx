import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import { ThemeProvider } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";
import { NotificationProvider } from "@contexts/NotificationContext";
import theme from "@styles/theme";
import "@styles/main.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({});
ReactDOM.createRoot(document.getElementById("root")!).render(
  <SnackbarProvider maxSnack={3}>
    <NotificationProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </ThemeProvider>
      </BrowserRouter>
    </NotificationProvider>
  </SnackbarProvider>
);
