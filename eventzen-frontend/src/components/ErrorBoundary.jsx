import { Component } from 'react';
import { 
  Typography, Button, Box, Container 
} from '@mui/material';
import { ReportProblem } from '@mui/icons-material';

export default class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // You can log errors to an error reporting service here
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <Container maxWidth="sm" sx={{ mt: 8 }}>
          <Box sx={{ 
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <ReportProblem color="error" sx={{ fontSize: 80, mb: 2 }} />
            <Typography variant="h4" gutterBottom>
              Something Went Wrong
            </Typography>
            <Typography variant="body1" paragraph>
              We're sorry for the inconvenience. The error has been logged and we're working to fix it.
            </Typography>
            {this.state.error && (
              <Typography variant="caption" color="text.secondary">
                Error: {this.state.error.message}
              </Typography>
            )}
            <Button 
              variant="contained" 
              color="primary" 
              onClick={this.handleReset}
              sx={{ mt: 3 }}
            >
              Try Again
            </Button>
          </Box>
        </Container>
      );
    }

    return this.props.children; 
  }
}