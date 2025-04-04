import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  TextField, Button, Container, Typography, Box, Paper
} from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import ErrorBoundary from '../ErrorBoundary';

export default function Login() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ 
    username: '', 
    password: '' 
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
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
              Sign In
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
                label="Password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
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
                Sign In
              </Button>
              <Box sx={{ textAlign: 'center' }}>
                <Link 
                  to="/register" 
                  style={{ 
                    textDecoration: 'none',
                    color: '#B2761B',
                    '&:hover': {
                      textDecoration: 'underline'
                    }
                  }}
                >
                  Don't have an account? Sign Up
                </Link>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Container>
    </ErrorBoundary>
  );
}