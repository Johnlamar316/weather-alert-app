import { describe, expect, it, vi } from 'vitest';
import AlertsTable from '../../components/AlertDataTable';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { AlertFeature } from 'types/alert';
import { formatToLocal } from '../../utils';

const mockNavigate = vi.fn();

// Mock navigate
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Sample data
const mockAlerts: AlertFeature[] = [
  {
    properties: {
      id: 'random-Id',
      event: 'Tornado Warning',
      severity: 'Extreme',
      areaDesc: 'Los Angeles, California',
      effective: '2025-04-03T12:00:00Z',
      expires: '2025-04-03T14:00:00Z',
      status: 'Actual',
    },
  },
];

describe('AlertsTable', () => {
  beforeEach(() => {
    mockNavigate.mockReset();
  });

  it('renders alerts data to the table', () => {
    render(
      <BrowserRouter>
        <AlertsTable alerts={mockAlerts} loading={false} />
      </BrowserRouter>
    );

    mockAlerts.forEach((alert) => {
      const { event, areaDesc, severity, effective, expires, status } = alert.properties;
      expect(screen.getByText(event)).toBeInTheDocument();
      expect(screen.getByText(areaDesc)).toBeInTheDocument();
      expect(screen.getByText(severity)).toBeInTheDocument();
      expect(screen.getByText(formatToLocal(effective))).toBeInTheDocument();
      expect(screen.getByText(formatToLocal(expires))).toBeInTheDocument();
      expect(screen.getByText(status)).toBeInTheDocument();
    });
  });
  it('navigates when a row is clicked', () => {
    render(
      <BrowserRouter>
        <AlertsTable alerts={mockAlerts} loading={false} />
      </BrowserRouter>
    );

    const row = screen.getByText('Tornado Warning');
    fireEvent.click(row);
    expect(mockNavigate).toHaveBeenCalled();
  });
});
