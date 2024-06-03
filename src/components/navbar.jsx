import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,

  Box,
  Stack
} from '@mui/material';
import { AddCircleOutline, Search, AccountCircle } from '@mui/icons-material';



const Navbar = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    //login logic
    console.log(`Logging in with ${username} and ${password}`);
    // After successful login, close the dialog
    setOpen(false);
  };

  return (

      <AppBar position="sticky" sx={{ boxShadow: 10, borderRadius: '10px' }}>
        <Toolbar>
          <Button component={Link} to="/" color="inherit">
            <Typography variant="h6">
              BUCHWEB
            </Typography>
          </Button>
          <Box sx={{ flexGrow: 1 }} />
          <Stack direction="row" spacing={2}>
            <Button component={Link} to="/add" color="inherit" startIcon={<AddCircleOutline />}>
              Erstellen
            </Button>
            <Button component={Link} to="/search" color="inherit" startIcon={<Search />}>
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
          >
            <MenuItem onClick={() => setOpen(true)}>Login</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

  );
};

export default Navbar;
