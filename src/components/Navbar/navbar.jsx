import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../provider/useAuth.js';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuList,
  Box,
  Stack,
  TextField,
  useMediaQuery
} from '@mui/material';
import { AddCircleOutline, Search, AccountCircle, Home } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const Navbar = () => {
  const { login, logout, isLoggedIn } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleLogin = async () => {
    try {
      const successfulLogin = await login(username, password);
      if (successfulLogin) {
        navigate('/');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleLogout = () => {
    logout();
    setPassword('');
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  return (
    <>
      <AppBar position="sticky" sx={{ boxShadow: 10 }}>
        <Toolbar>
          {isMobile ? (
            <IconButton component={Link} to="/" color="inherit">
              <Home />
            </IconButton>
          ) : (
            <Button component={Link} to="/" color="inherit">
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                <span style={{ color: theme.palette.custom3.main }}>Buch</span>
                <span style={{ color: theme.palette.custom4.main }}>Web</span>
              </Typography>
            </Button>
          )}
          <Box sx={{ flexGrow: 1 }} />
          <Stack direction="row" spacing={2}>
            <Button
              component={Link} to="/add"
              color="custom1"
              sx={{ fontWeight: 'bold', display: 'inline-flex' }}
              startIcon={<AddCircleOutline />}
            >
              Erstellen
            </Button>
            <Button
              component={Link} to="/search"
              color="custom1"
              sx={{ fontWeight: 'bold', display: 'inline-flex' }}
              startIcon={<Search />}
            >
              Suchen
            </Button>
            <IconButton color="inherit" onClick={handleMenu}>
              <AccountCircle style={{ color: isLoggedIn() ? theme.palette.secondary.main : 'red' }} />
            </IconButton>
          </Stack>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            disableAutoFocusItem
          >
            <MenuList>
              <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2, width: 250 }}>
                {!isLoggedIn() && (
                  <>
                    <TextField
                      label="Username"
                      variant="outlined"
                      size="small"
                      value={username}
                      onChange={handleUsernameChange}
                      fullWidth
                    />
                    <TextField
                      label="Password"
                      variant="outlined"
                      size="small"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      fullWidth
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleLogin}
                      fullWidth
                    >
                      Login
                    </Button>
                  </>
                )}
                {isLoggedIn() && (
                  <>
                    <Typography textAlign="center" sx={{ fontSize: '1.3rem', fontWeight: 'bold', color: 'black' }}>
                      {username}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleLogout}
                      fullWidth
                    >
                      Logout
                    </Button>
                  </>
                )}
              </Box>
            </MenuList>
          </Menu>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
