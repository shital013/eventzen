import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  TextField, Button, Container, Typography, Box, Paper
} from '@mui/material';
import { getVenueById, createVenue, updateVenue } from '../../services/venues';
import ErrorBoundary from '../ErrorBoundary';

export default function VenueForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    capacity: '',
    amenities: '',
    location: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      const fetchVenue = async () => {
        try {
          const venue = await getVenueById(id);
          setFormData(venue);
        } catch (err) {
          setError(err.message);
        }
      };
      fetchVenue();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateVenue(id, formData);
      } else {
        await createVenue(formData);
      }
      navigate('/venues');
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed');
    }
  };

  return (
    <ErrorBoundary>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ color: '#181D1C' }}>
            {id ? 'Edit Venue' : 'Create New Venue'}
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            {/* Form fields remain the same */}
            
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
              <Button
                variant="outlined"
                onClick={() => navigate('/venues')}
                sx={{
                  color: '#181D1C',
                  borderColor: '#181D1C',
                  '&:hover': {
                    borderColor: '#B2761B',
                    color: '#B2761B'
                  }
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: '#B2761B',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#9A6516',
                    boxShadow: '0px 2px 4px rgba(0,0,0,0.25)'
                  },
                  px: 4,
                  py: 1.5
                }}
              >
                {id ? 'Update' : 'Create'} Venue
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </ErrorBoundary>
  );
}