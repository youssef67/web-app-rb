import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app'
import { ThemeProvider } from '@mui/material/styles';
import theme from '@styles/theme'
import { Container } from "@mui/material";
import '@styles/main.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>
)
