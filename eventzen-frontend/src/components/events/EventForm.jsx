import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  TextField, Button, Container, Typography, Box, 
  MenuItem, FormControl, InputLabel, Select, Paper
} from '@mui/material';
import { getEventById, createEvent, updateEvent } from '../../services/events';
import { getVenues } from '../../services/venues';
import ErrorBoundary from '../ErrorBoundary';

export default function EventForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [venues, setVenues] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    status: 'DRAFT',
    category: '',
    venueId: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const venuesData = await getVenues();
        setVenues(venuesData);
        
        if (id) {
          const eventData = await getEventById(id);
          setFormData({
            ...eventData,
            startDate: eventData.startDate.split('T')[0],
            endDate: eventData.endDate.split('T')[0],
          });
        }
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateEvent(id, formData);
      } else {
        await createEvent(formData);
      }
      navigate('/events');
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed');
    }
  };

  return (
    <ErrorBoundary>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ color: '#181D1C' }}>
            {id ? 'Edit Event' : 'Create New Event'}
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            {/* Form fields remain the same */}
            
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
              <Button
                variant="outlined"
                onClick={() => navigate('/events')}
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
                {id ? 'Update' : 'Create'} Event
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </ErrorBoundary>
  );
}