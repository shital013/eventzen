import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, MenuItem, Paper } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import ErrorBoundary from '../ErrorBoundary';

export default function Register() {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'CUSTOMER'
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <ErrorBoundary>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center' 
          }}>
            <Typography component="h1" variant="h4" sx={{ color: '#181D1C', mb: 2 }}>
              Register
            </Typography>
            {error && (
              <Typography color="error" sx={{ mb: 2 }}>
                {error}
              </Typography>
            )}
            <Box 
              component="form" 
              onSubmit={handleSubmit} 
              sx={{ mt: 1, width: '100%' }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                label="Username"
                autoFocus
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
              <TextField
                select
                label="Role"
                fullWidth
                margin="normal"
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
              >
                <MenuItem value="CUSTOMER">Customer</MenuItem>
                <MenuItem value="ADMIN">Admin</MenuItem>
              </TextField>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  py: 1.5,
                  backgroundColor: '#B2761B',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#9A6516',
                    boxShadow: '0px 2px 4px rgba(0,0,0,0.25)'
                  }
                }}
              >
                Register
              </Button>
              <Box sx={{ textAlign: 'center' }}>
                <Link 
                  to="/login" 
                  style={{ 
                    textDecoration: 'none',
                    color: '#B2761B',
                    '&:hover': {
                      textDecoration: 'underline'
                    }
                  }}
                >
                  Already have an account? Sign In
                </Link>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Container>
    </ErrorBoundary>
  );
}