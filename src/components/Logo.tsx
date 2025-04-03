import { Box, Typography } from '@mui/material';

const Logo = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      mb: 3,
    }}
  >
    <Box
      data-testid="logo-image"
      component="img"
      src="/assets/logo.png"
      alt="App Logo"
      sx={{
        height: { xs: 60, sm: 80 },
      }}
    />
    <Typography variant="h5" gutterBottom color="#fff" textAlign="center" data-testid="logo-text">
      National Weather Alerts
    </Typography>
  </Box>
);

export default Logo;
