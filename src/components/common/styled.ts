import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import { Box } from '@mui/material';

const FilterWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'flex-end',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(3),
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: 'rgba(0, 0, 0, 0.20)',
}));

const StyledButton = styled(Button)<ButtonProps>(({ variant }) => {
  if (variant === 'contained') {
    return {
      backgroundColor: '#fff',
      color: '#000',
      fontWeight: 'bold',
      '&:hover': {
        backgroundColor: '#f1f1f1',
      },
    };
  }

  if (variant === 'outlined') {
    return {
      borderColor: '#fff',
      color: '#fff',
      fontWeight: 'bold',
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
      },
    };
  }
  return {};
});

const BaseBackground = styled('div')(() => ({
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: -1,
  width: '100%',
  height: '100%',
  pointerEvents: 'none',
  overflow: 'hidden',
}));

const BackgroundVideo = styled('video')(() => ({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  filter: 'brightness(30%)',
}));

const BackgroundImage = styled('img')(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: -1,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  filter: 'brightness(100%)',
}));

const StyledDataGridContainer = styled(Box)(({ theme }) => ({
  height: 500,
  minHeight: 500,
  maxWidth: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.20)',
  borderRadius: 20,
  padding: theme.spacing(2),
  marginTop: theme.spacing(4),
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
  color: '#fff',
}));

const CardWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(4),
  backgroundColor: 'rgba(0, 0, 0, 0.65)',
  borderRadius: 20,
  padding: theme.spacing(12),
  marginTop: theme.spacing(3),
  color: '#fff',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
}));

const InfoSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: theme.spacing(4),
  flexWrap: 'wrap',
}));

const LeftPanel = styled(Box)(({ theme }) => ({
  flex: 1,
  minWidth: 300,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  alignItems: 'center',
}));

const BadgeCard = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'topColor',
})<{ topColor: string }>(({ theme, topColor }) => ({
  width: 240,
  height: 220,
  borderRadius: 24,
  background: `linear-gradient(to bottom, ${topColor}, #1c1c1c)`,
  color: '#fff',
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}));

const LocationCard = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: theme.spacing(2),
  backgroundColor: 'rgba(255, 255, 255, 0.08)',
  borderRadius: 16,
  padding: theme.spacing(3),
  color: '#fff',
  width: 240,
  height: 180,
  maxHeight: 180,
  overflowY: 'auto',
}));

const RightPanel = styled(Box)(({ theme }) => ({
  flex: 2,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

const IconImage = styled('img')(() => ({
  width: 120,
  height: 120,
}));

export {
  FilterWrapper,
  StyledButton,
  BaseBackground,
  BackgroundVideo,
  BackgroundImage,
  StyledDataGridContainer,
  CardWrapper,
  InfoSection,
  LeftPanel,
  BadgeCard,
  LocationCard,
  RightPanel,
  IconImage,
};
