import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './components/provider/AuthProvider.jsx';
import { ThemeProvider } from '@mui/material/styles';
import theme from './themes/theme'; // Importiere dein benutzerdefiniertes Thema
import CssBaseline from '@mui/material/CssBaseline'; // Optional: Um einheitliche CSS-Basisstile zu setzen

import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Optional: Setzt einheitliche CSS-Basisstile */}
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
