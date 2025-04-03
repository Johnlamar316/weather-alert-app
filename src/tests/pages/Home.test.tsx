import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Home from 'pages/Home';
import { useGetAlertsQuery } from 'states/api';
import { AlertFeature } from 'types/alert';

// Mock API hook
vi.mock('states/api', () => ({
  useGetAlertsQuery: vi.fn(),
}));

// Mock Components
vi.mock('components/Background', () => ({
  default: () => <div data-testid="background">Background</div>,
}));

vi.mock('components/Logo', () => ({
  default: () => <div data-testid="logo">Logo</div>,
}));

vi.mock('components/FilterPanel', () => ({
  default: (props: { onChange: (filters: Record<string, string>) => void }) => (
    <div data-testid="filter-panel" onClick={() => props.onChange({ severity: 'Extreme' })}>
      FilterPanel
    </div>
  ),
}));

vi.mock('components/AlertDataTable', () => ({
  default: (props: { alerts: AlertFeature[]; loading: boolean }) => (
    <div data-testid="alert-table">
      {props.loading ? 'Loading...' : `Showing ${props.alerts.length} alert`}
    </div>
  ),
}));

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
};

describe('Home page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading UI while data is being fetched', () => {
    (useGetAlertsQuery as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: null,
      error: null,
      isLoading: true,
    });

    renderWithRouter(<Home />);
    expect(screen.getByTestId('background')).toBeInTheDocument();
    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.getByTestId('filter-panel')).toBeInTheDocument();
    expect(screen.getByTestId('alert-table')).toHaveTextContent('Loading...');
  });

  it('renders alerts when data is available', () => {
    (useGetAlertsQuery as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: {
        features: [{ properties: { id: '1', event: 'Storm' } }],
      },
      error: null,
      isLoading: false,
    });

    renderWithRouter(<Home />);
    expect(screen.getByTestId('alert-table')).toHaveTextContent('Showing 1 alert');
  });

  it('renders error message if fetching fails', () => {
    (useGetAlertsQuery as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: null,
      error: true,
      isLoading: false,
    });

    renderWithRouter(<Home />);
    expect(screen.getByText((text) => text.includes('Failed to load alerts'))).toBeInTheDocument();
  });

  it('calls onChange when FilterPanel is clicked', () => {
    const mockUseGetAlertsQuery = useGetAlertsQuery as unknown as ReturnType<typeof vi.fn>;

    mockUseGetAlertsQuery.mockReturnValue({
      data: { features: [] },
      error: null,
      isLoading: false,
    });

    renderWithRouter(<Home />);
    fireEvent.click(screen.getByTestId('filter-panel'));

    expect(mockUseGetAlertsQuery).toHaveBeenCalledWith({ severity: 'Extreme' });
  });
});
