import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './provider/useAuth.js';
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
  TextField
} from '@mui/material';
import { AddCircleOutline, Search, AccountCircle } from '@mui/icons-material';

const Navbar = () => {

  const { login, logout, writeAccess, isLoggedIn } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

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

  return (
    <>
      <AppBar position="sticky" sx={{ boxShadow: 10, borderRadius: '10px' }}>
        <Toolbar>
          <Button component={Link} to="/" color="inherit">
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              <span style={{ color: 'darkorange' }}>Buch</span>
              <span style={{ color: 'white' }}>Web</span>
            </Typography>
          </Button>
          <Box sx={{ flexGrow: 1 }} />
          <Stack direction="row" spacing={2}>
            <Button
              component={Link} to="/add" 
              color="inherit" 
              disabled={writeAccess} 
              sx={{ fontWeight: 'bold' }} 
              startIcon={<AddCircleOutline />}
            >
              Erstellen 
            </Button>
            <Button 
              component={Link} to="/search" 
              color="inherit" 
              sx={{ fontWeight: 'bold' }} 
              startIcon={<Search />}
            >
                Suchen
            </Button>
            <IconButton color="inherit" onClick={handleMenu}>
              <AccountCircle />
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
                      onChange={(e) => setUsername(e.target.value)}
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
