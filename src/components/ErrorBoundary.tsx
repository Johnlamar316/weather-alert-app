import React from 'react';
import { FallbackProps, ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { Button, Typography, Container } from '@mui/material';

// Fallback UI shown when an error is caught.
const ErrorFallback: React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <Container sx={{ mt: 10, textAlign: 'center' }}>
      <Typography variant="h4" color="error" gutterBottom>
        Something went wrong.
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        {error.message}
      </Typography>
      <Button onClick={resetErrorBoundary} variant="contained">
        Try again
      </Button>
    </Container>
  );
};

// ErrorBoundary component using `react-error-boundary` to catch and display errors.
// Wrap around any component that might throw during rendering.

const ErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        window.location.reload();
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
};

export default ErrorBoundary;
