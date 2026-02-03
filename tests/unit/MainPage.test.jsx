import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MainPage from '../../client/src/components/MainPage';

// Mock child components
jest.mock('../../client/src/components/Header', () => {
  return function MockHeader() {
    return <div data-testid="header">Header</div>;
  };
});

jest.mock('../../client/src/components/MyMap', () => {
  return function MockMyMap() {
    return <div data-testid="my-map">Map</div>;
  };
});

jest.mock('../../client/src/components/sidebar/SpotForm', () => {
  return function MockSpotForm() {
    return <div data-testid="spot-form">Spot Form</div>;
  };
});

// Mock Grommet components
jest.mock('grommet', () => ({
  Box: ({ children, ...props }) => <div {...props}>{children}</div>,
  Button: ({ children, onClick, label, icon }) => (
    <button onClick={onClick} data-testid="logout-button">
      {icon} {label}
    </button>
  ),
}));

jest.mock('grommet-icons', () => ({
  Logout: () => <span>Logout Icon</span>,
}));

describe('MainPage Component', () => {
  const mockSetView = jest.fn();

  beforeEach(() => {
    mockSetView.mockClear();
  });

  test('renders without crashing', () => {
    render(<MainPage setView={mockSetView} />);
  });

  test('renders all main components', () => {
    render(<MainPage setView={mockSetView} />);
    
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('my-map')).toBeInTheDocument();
    expect(screen.getByTestId('spot-form')).toBeInTheDocument();
  });

  test('renders logout button', () => {
    render(<MainPage setView={mockSetView} />);
    
    const logoutButton = screen.getByTestId('logout-button');
    expect(logoutButton).toBeInTheDocument();
    expect(logoutButton).toHaveTextContent('Logout');
  });

  test('calls setView with "login" when logout is clicked', () => {
    render(<MainPage setView={mockSetView} />);
    
    const logoutButton = screen.getByTestId('logout-button');
    fireEvent.click(logoutButton);
    
    expect(mockSetView).toHaveBeenCalledWith('login');
    expect(mockSetView).toHaveBeenCalledTimes(1);
  });
});
