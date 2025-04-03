import { Suspense, lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

const Home = lazy(() => import('pages/Home'));
const AlertDetails = lazy(() => import('pages/AlertDetails'));

const routes = [
  {
    path: '/',
    element: (
      <Suspense fallback={<CircularProgress />}>
        <Home />
      </Suspense>
    ),
  },
  {
    path: '/alert/:id',
    element: (
      <Suspense fallback={<CircularProgress />}>
        <AlertDetails />
      </Suspense>
    ),
  },
];

const AppRoutes = () => useRoutes([...routes]);

export default AppRoutes;
