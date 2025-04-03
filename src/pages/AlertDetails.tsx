import { Fragment } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Typography, CircularProgress, Button, Chip } from '@mui/material';
import {
  CardWrapper,
  InfoSection,
  LeftPanel,
  BadgeCard,
  LocationCard,
  RightPanel,
  IconImage,
} from 'components/common/styled';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PlaceIcon from '@mui/icons-material/Place';
import { useGetAlertByIdQuery } from 'states/api';
import Background from 'components/Background';
import { AlertSeverity } from 'types/enum';
import { severityGradientTopColor, severityIconMap } from '../utils';
import PageWrapper from 'components/PageWrapper';

/**
 * AlertDetails Component
 *
 * This component displays information about a specific weather alert.
 * It fetches the alert data based on the alert `id` from the URL using `useParams`,
 * and utilizes RTK Query's `useGetAlertByIdQuery` for data retrieval.
 *
 * Features:
 * - Video/image background for alert detail page
 * - "Back" button navigation
 * - Displays severity, event, area description, headline, sender, and description
 * - Uses styled components for layout
 *
 * UX Considerations:
 * - Shows loading spinner while fetching
 * - Displays error message if the alert cannot be fetched
 * - Scrollable alert description with left-aligned content
 * - Dynamic topColor based on alert severity
 *
 * returns JSX.Element
 */

const AlertDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isLoading, error } = useGetAlertByIdQuery(id || '');
  const properties = data?.properties;

  if (isLoading) {
    return (
      <Box sx={{ mt: 6, textAlign: 'center' }}>
        <CircularProgress sx={{ color: '#000' }} />
      </Box>
    );
  }

  if (error || !properties) {
    return (
      <Box sx={{ mt: 6 }}>
        <Typography color="error">Unable to fetch alert details.</Typography>
      </Box>
    );
  }

  const severity = properties.severity as AlertSeverity;
  const topColor = severityGradientTopColor[severity] || '#444';

  return (
    <Fragment>
      <Background
        type="image"
        src="https://weatherappinterviewbucket.s3.eu-west-2.amazonaws.com/alert-background.jpg"
      />
      <PageWrapper>
        <Box sx={{ maxWidth: 1000, mx: 'auto', px: 2 }}>
          <Box sx={{ position: 'fixed', top: 16, left: 16, zIndex: 1000 }}>
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate(-1)}
              variant="outlined"
              sx={{ color: '#fff', borderColor: '#fff' }}
            >
              Back
            </Button>
          </Box>

          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Chip
              label={properties.event}
              sx={{
                backgroundColor: '#000',
                color: '#fff',
                borderRadius: '999px',
                fontWeight: 'bold',
                px: 2,
              }}
            />
          </Box>

          <CardWrapper>
            <InfoSection>
              {/* LEFT SIDE */}
              <LeftPanel>
                <BadgeCard topColor={topColor}>
                  <IconImage src={severityIconMap[severity]} alt="Severity Icon" />
                  <Typography sx={{ alignSelf: 'flex-start' }} variant="h6">
                    {properties.severity}
                  </Typography>
                </BadgeCard>

                <LocationCard>
                  <Box sx={{ mt: '2px' }}>
                    <PlaceIcon />
                  </Box>

                  <Typography
                    variant="body2"
                    sx={{
                      whiteSpace: 'pre-line',
                      fontSize: '1rem',
                      lineHeight: 1.5,
                      textAlign: 'left',
                    }}
                  >
                    {properties.areaDesc}
                  </Typography>
                </LocationCard>
              </LeftPanel>

              {/* RIGHT SIDE */}
              <RightPanel>
                <Typography
                  variant="h6"
                  sx={{
                    borderBottom: '1px solid #777',
                    pb: 1,
                    textAlign: 'left',
                  }}
                >
                  {properties.headline}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    textAlign: 'left',
                    fontSize: '0.7rem',
                    borderBottom: '1px solid rgba(119, 119, 119, 0.4)',
                    pb: 2,
                  }}
                >
                  {new Date(properties.sent).toLocaleString()} -{' '}
                  {new Date(properties.expires).toLocaleString()} by {properties.senderName}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    whiteSpace: 'pre-line',
                    lineHeight: 1.6,
                    height: 340,
                    overflowY: 'auto',
                    textAlign: 'left',
                    pr: 1,
                  }}
                >
                  {properties.description.replace(/\*/g, '')}
                </Typography>
              </RightPanel>
            </InfoSection>
          </CardWrapper>
        </Box>
      </PageWrapper>
    </Fragment>
  );
};

export default AlertDetails;
