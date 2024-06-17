import { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Avatar,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useAuth } from './provider/useAuth.js';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
    const { logout, login, isLoggedIn} = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLoginClick = async () => {
        try {
          setErrorMessage('');
          if (isLoggedIn()) {
            logout();
            return;
          }
          const successfulLogin = await login(username, password);
          if (successfulLogin) {
            navigate('/');
          } else {
            setErrorMessage('Das Passwort oder der Benutzername ist falsch. Bitte versuche es erneut');
          }
        } catch (error) {
          console.log(error)
            setErrorMessage('Fehler bei der Anmeldung');
        }
      };

      useEffect(() => {
        const timeout = setTimeout(() => {
          setErrorMessage('');
        }, 2000);
        return () => clearTimeout(timeout);
      
    }, [errorMessage]);
  
    return (
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'darkorange' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              onClick={handleLoginClick}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="primary"
            >
            {isLoggedIn() ? 'Logout' : 'Login'}
            </Button>
          </Box>
        </Box>
      </Container>
    );
  }
  
  export default LoginForm;