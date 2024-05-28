import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    // Hier kannst du die Login-Logik hinzufügen
    console.log('Logging in with', { username, password });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ top: 0 }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuOpen}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Button color="inherit">Suchen</Button>
          <Button color="inherit">Erstellen</Button>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Benutzername"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ bgcolor: 'white', borderRadius: 1, mr: 1 }}
          />
          <TextField
            variant="outlined"
            size="small"
            type="password"
            placeholder="Passwort"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ bgcolor: 'white', borderRadius: 1, mr: 1 }}
          />
          <Button color="inherit" onClick={handleLogin}>Login</Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Suchen</MenuItem>
            <MenuItem onClick={handleMenuClose}>Erstellen</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
