import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import AlertDetails from 'pages/AlertDetails';
import { BrowserRouter } from 'react-router-dom';
import { useGetAlertByIdQuery } from 'states/api';
import { mockAlerts } from 'utils/index';

// 🛠️ 1. Mock navigate properly
const mockNavigate = vi.fn();

// 🛠️ 2. Mock react-router-dom BEFORE anything uses it
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({ id: 'test-id' }),
  };
});

// 🛠️ 3. Mock API
vi.mock('states/api', () => ({
  useGetAlertByIdQuery: vi.fn(),
}));

// 🛠️ 4. Mock alert data (with correct structure)
const mockAlert = {
  properties: {
    id: 'random-Id',
    event: 'Tornado Warning',
    severity: 'Extreme',
    areaDesc: 'Los Angeles, California',
    effective: '2025-04-03T12:00:00Z',
    expires: '2025-04-03T14:00:00Z',
    status: 'Actual',
    headline: 'Severe weather alert',
    description: 'Tornado warning for Los Angeles area',
    senderName: 'National Weather Service',
    sent: '2025-04-03T12:00:00Z',
  },
};

describe('AlertDetails', () => {
  beforeEach(() => {
    mockNavigate.mockReset();
  });

  it('renders loading spinner initially', () => {
    (useGetAlertByIdQuery as unknown as Mock).mockReturnValue({
      data: null,
      error: null,
      isLoading: true,
    });

    render(
      <BrowserRouter>
        <AlertDetails />
      </BrowserRouter>
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders error message if fetching fails', () => {
    (useGetAlertByIdQuery as unknown as Mock).mockReturnValue({
      data: null,
      error: true,
      isLoading: false,
    });

    render(
      <BrowserRouter>
        <AlertDetails />
      </BrowserRouter>
    );

    expect(screen.getByText('Unable to fetch alert details.')).toBeInTheDocument();
  });

  it('renders alert details when data is available', () => {
    (useGetAlertByIdQuery as unknown as Mock).mockReturnValue({
      data: mockAlert,
      error: null,
      isLoading: false,
    });

    render(
      <BrowserRouter>
        <AlertDetails />
      </BrowserRouter>
    );

    mockAlerts.forEach((alert) => {
      const { event, headline, areaDesc, description, severity } = alert.properties;

      expect(screen.getByText(event)).toBeInTheDocument();
      expect(screen.getByText(severity)).toBeInTheDocument();
      expect(screen.getByText(areaDesc)).toBeInTheDocument();
      expect(screen.getByText(headline)).toBeInTheDocument();

      const dateElement = screen.getByTestId('alert-dates');
      expect(dateElement).toHaveTextContent('4/3/2025');
      expect(dateElement).toHaveTextContent('1:00:00 PM');
      expect(dateElement).toHaveTextContent('National Weather Service');

      expect(screen.getByText(description)).toBeInTheDocument();
    });
  });

  it('navigates back when Back button is clicked', () => {
    (useGetAlertByIdQuery as unknown as Mock).mockReturnValue({
      data: mockAlert,
      error: null,
      isLoading: false,
    });

    render(
      <BrowserRouter>
        <AlertDetails />
      </BrowserRouter>
    );

    const backButton = screen.getByRole('button', { name: /back/i });
    fireEvent.click(backButton);

    expect(mockNavigate).toHaveBeenCalledWith(-1); // it should navigate -1
  });
});
