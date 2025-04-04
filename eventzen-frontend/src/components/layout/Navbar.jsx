import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  IconButton, 
  Typography, 
  Box,
  Button,
  Menu,
  MenuItem,
  Divider
} from '@mui/material';
import { 
  Menu as MenuIcon,
  Event as EventIcon,
  Place as VenueIcon,
  AccountCircle as AccountIcon,
  ExitToApp as LogoutIcon
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import ErrorBoundary from '../ErrorBoundary';

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
    navigate('/login');
  };

  return (
    <ErrorBoundary>
      <AppBar 
        position="fixed"
        sx={{ 
          backgroundColor: '#181D1C',
          boxShadow: 'none',
          zIndex: (theme) => theme.zIndex.drawer + 1
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Logo on the far left */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography 
              variant="h6" 
              component={Link} 
              to="/dashboard"
              sx={{ 
                color: 'white',
                textDecoration: 'none',
                fontWeight: 'bold',
                fontFamily: '"Roboto Condensed", sans-serif',
                '&:hover': {
                  color: '#B2761B'
                }
              }}
            >
              EventZen
            </Typography>
          </Box>

          {/* Navigation items in the center */}
          <Box sx={{ 
            display: { xs: 'none', md: 'flex' },
            gap: 2,
            alignItems: 'center'
          }}>
            <Button
              component={Link}
              to="/events"
              startIcon={<EventIcon />}
              sx={{
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(178, 118, 27, 0.1)',
                  color: '#B2761B'
                }
              }}
            >
              Events
            </Button>
            <Button
              component={Link}
              to="/venues"
              startIcon={<VenueIcon />}
              sx={{
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(178, 118, 27, 0.1)',
                  color: '#B2761B'
                }
              }}
            >
              Venues
            </Button>
          </Box>

          {/* User menu on the right */}
          <Box>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem 
                component={Link} 
                to="/profile"
                onClick={handleClose}
              >
                My Profile
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout}>
                <LogoutIcon sx={{ mr: 1 }} />
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </ErrorBoundary>
  );
}