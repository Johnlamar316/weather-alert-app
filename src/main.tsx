import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from 'components/ErrorBoundary';
import Providers from 'states/providers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme/theme';
import './index.css';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary>
        <Providers>
          <BrowserRouter>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <App />
            </LocalizationProvider>
          </BrowserRouter>
        </Providers>
      </ErrorBoundary>
    </ThemeProvider>
  </StrictMode>
);
