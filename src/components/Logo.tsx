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
      aria-label="App logo"
    />
    <Typography
      variant="h5"
      gutterBottom
      color="#fff"
      textAlign="center"
      data-testid="logo-text"
      aria-label="National Weather Alerts"
    >
      National Weather Alerts
      <Box
        component="img"
        src="/assets/red-alert.png"
        alt="Alert Icon"
        sx={{ width: 20, height: 20 }}
        aria-label="red alert icon"
      />
    </Typography>
  </Box>
);

export default Logo;
