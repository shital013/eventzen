import { useState, useEffect } from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, Button, Typography 
} from '@mui/material';
import { getVenues } from '../../services/venues';
import ErrorBoundary from '../ErrorBoundary';

export default function VenueList() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const data = await getVenues();
        setVenues(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchVenues();
  }, []);

  return (
    <ErrorBoundary>
      <TableContainer component={Paper}>
        <Typography variant="h5" sx={{ p: 2 }}>Venues</Typography>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Capacity</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {venues.map((venue) => (
                <TableRow key={venue.id}>
                  <TableCell>{venue.name}</TableCell>
                  <TableCell>{venue.location}</TableCell>
                  <TableCell>{venue.capacity}</TableCell>
                  <TableCell>
                    <Button variant="outlined">Edit</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </ErrorBoundary>
  );
}