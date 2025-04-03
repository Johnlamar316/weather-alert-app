import './App.css';
import AppRoutes from './AppRoutes';
import { AnimatePresence } from 'framer-motion';

function App() {
  return (
    <AnimatePresence mode="wait">
      <AppRoutes />
    </AnimatePresence>
  );
}

export default App;
