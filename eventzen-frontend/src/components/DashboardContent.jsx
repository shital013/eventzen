import { Typography, Box, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';

export default function DashboardContent() {
  return (
    <ErrorBoundary>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#181D1C' }}>
          Welcome to EventZen!
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Manage your events and venues from this dashboard.
        </Typography>
        <Box sx={{ 
          display: 'flex', 
          gap: 2,
          flexWrap: 'wrap'
        }}>
          <Button
            component={Link}
            to="/events"
            variant="contained"
            sx={{
              backgroundColor: '#B2761B',
              color: 'white',
              '&:hover': {
                backgroundColor: '#9A6516',
                boxShadow: '0px 2px 4px rgba(0,0,0,0.25)'
              },
              px: 4,
              py: 2,
              minWidth: 200
            }}
          >
            View Events
          </Button>
          <Button
            component={Link}
            to="/events/new"
            variant="contained"
            sx={{
              backgroundColor: '#B2761B',
              color: 'white',
              '&:hover': {
                backgroundColor: '#9A6516',
                boxShadow: '0px 2px 4px rgba(0,0,0,0.25)'
              },
              px: 4,
              py: 2,
              minWidth: 200
            }}
          >
            Create Event
          </Button>
          <Button
            component={Link}
            to="/venues"
            variant="contained"
            sx={{
              backgroundColor: '#B2761B',
              color: 'white',
              '&:hover': {
                backgroundColor: '#9A6516',
                boxShadow: '0px 2px 4px rgba(0,0,0,0.25)'
              },
              px: 4,
              py: 2,
              minWidth: 200
            }}
          >
            View Venues
          </Button>
          <Button
            component={Link}
            to="/venues/new"
            variant="contained"
            sx={{
              backgroundColor: '#B2761B',
              color: 'white',
              '&:hover': {
                backgroundColor: '#9A6516',
                boxShadow: '0px 2px 4px rgba(0,0,0,0.25)'
              },
              px: 4,
              py: 2,
              minWidth: 200
            }}
          >
            Add Venue
          </Button>
        </Box>
      </Paper>
    </ErrorBoundary>
  );
}