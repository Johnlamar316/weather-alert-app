import { Fragment, useState } from 'react';
import { Container, Box, Skeleton, Typography } from '@mui/material';
import { useGetAlertsQuery } from 'states/api';
import AlertDataTable from 'components/AlertDataTable';
import Background from 'components/Background';
import Logo from 'components/Logo';
import FilterPanel from 'components/FilterPanel';
import PageWrapper from 'components/PageWrapper';

/**
 * `Home` is the main dashboard component of the Weather Alerts App.
 *
 * It fetches weather alert data using `useGetAlertsQuery` from RTK, and allows
 * users to filter alerts via the `FilterPanel` component.
 *
 * The component structure includes:
 * - A video background
 * - Application logo
 * - Dynamic filters
 * - Error message (if API fails)
 * - A responsive data table from MUI to display alerts
 *
 * @component
 * returns JSX.Element
 */

const Home = () => {
  //Local state for storing filter values selected by the user.
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [limit, setLimit] = useState<number | undefined>(10);

  //Fetches alert data based on filters from the RTK Query hook.
  const { data, error, isLoading } = useGetAlertsQuery({ ...filters, limit });

  return (
    <Fragment>
      {/* Background video */}
      <Background
        type={'video'}
        src={'https://weatherappinterviewbucket.s3.eu-west-2.amazonaws.com/background-img.mp4'}
      />
      <PageWrapper>
        <main role="main">
          <Container>
            {/* Logo */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
              <Logo />
            </Box>
            {/* Component for filters (e.g. severity, status, etc.) */}
            <FilterPanel
              onChange={(value: Record<string, string>) => setFilters(value)}
              isLoading={isLoading}
            />
            {/* Shows error message if fetching data failed */}
            {error && (
              <Typography role="alert" aria-live="assertive" color="error">
                Failed to load alerts.
              </Typography>
            )}
            {/* Display fetched alerts or loading state */}
            {isLoading ? (
              <Skeleton variant="rectangular" height={450} />
            ) : (
              <AlertDataTable alerts={data?.features || []} limit={limit} setLimit={setLimit} />
            )}
          </Container>
        </main>
      </PageWrapper>
    </Fragment>
  );
};

export default Home;
