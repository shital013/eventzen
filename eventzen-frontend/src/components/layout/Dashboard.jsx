import { Box, CssBaseline } from '@mui/material';
import Navbar from './Navbar';
import ErrorBoundary from '../ErrorBoundary';

export default function Dashboard({ children }) {
  return (
    <ErrorBoundary>
      <Box sx={{ 
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: '#F5F5F5'
      }}>
        <CssBaseline />
        <Navbar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            pt: 10, // Account for navbar height
            backgroundColor: 'white',
            minHeight: '100vh'
          }}
        >
          {children}
        </Box>
      </Box>
    </ErrorBoundary>
  );
}