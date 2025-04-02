import { useRoutes } from 'react-router-dom';
import Home from './pages/Home.tsx';
import AlertDetails from './pages/AlertDetails.tsx';

const routes = [
  { path: '/', element: <Home /> },
  { path: '/alert/:id', element: <AlertDetails /> },
];

const AppRoutes = () => useRoutes([...routes]);

export default AppRoutes;
