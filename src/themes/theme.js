import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#606C38', // Primärfarbe für Navbar, 'positive' Buttons und 'reguläre' Buttons
    },
    secondary: {
      main: '#283618', // Sekundärfarbe wird als Akzentfarbe verwendet
    },
    custom1: {
      main: '#FEFAE0', // Farbe 1 Wird für ButtonText verwendet
    },
    custom2: {
      main: '#DDA15E', // Benutzerdefinierte Farbe 2
    },
    custom3: {
      main: '#DDA15E', // Farbe 3 Wird für den Logoteil 'Buch' verwendet
    },
    custom4: {
      main: '#BC6C25', // Farbe 4 Wird für den Logoteil 'Web' verwendet
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 'bold',
        },
      },
    },
  },
});

export default theme;