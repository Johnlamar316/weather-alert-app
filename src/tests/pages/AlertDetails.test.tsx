import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import AlertDetails from '../../pages/AlertDetails';

test('renders alert ID from URL params', () => {
  render(
    <MemoryRouter initialEntries={['/alert/12345']}>
      <Routes>
        <Route path="/alert/:id" element={<AlertDetails />} />
      </Routes>
    </MemoryRouter>
  );

  expect(screen.getByText(/alertdetails for: 12345/i)).toBeInTheDocument();
});
