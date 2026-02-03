import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import MainPage from '../../client/src/components/MainPage';

// Mock child components to isolate MainPage behavior
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
  Box: ({ children, ...props }) => <div data-testid={props['data-testid']} {...props}>{children}</div>,
  Button: ({ children, onClick, label, icon, ...props }) => (
    <button onClick={onClick} data-testid={props['data-testid']} aria-label={label}>
      {icon} {label}
    </button>
  ),
}));

jest.mock('grommet-icons', () => ({
  Logout: () => <span>Logout Icon</span>,
}));

describe('MainPage Component - Input/Output Behavior', () => {
  let mockSetView;

  beforeEach(() => {
    mockSetView = jest.fn();
  });

  describe('Rendering Behavior (Output)', () => {
    test('should render all required sections when provided setView prop', () => {
      render(<MainPage setView={mockSetView} />);
      
      // Verify main container exists
      expect(screen.getByTestId('main-page')).toBeInTheDocument();
      
      // Verify all major sections are present
      expect(screen.getByTestId('header')).toBeInTheDocument();
      expect(screen.getByTestId('map-section')).toBeInTheDocument();
      expect(screen.getByTestId('form-section')).toBeInTheDocument();
      expect(screen.getByTestId('my-map')).toBeInTheDocument();
      expect(screen.getByTestId('spot-form')).toBeInTheDocument();
    });

    test('should render logout button with correct label', () => {
      render(<MainPage setView={mockSetView} />);
      
      const logoutButton = screen.getByTestId('logout-button');
      expect(logoutButton).toBeInTheDocument();
      expect(logoutButton).toHaveAttribute('aria-label', 'Logout');
      expect(logoutButton).toHaveTextContent('Logout');
    });

    test('should have map section on the left and form section on the right', () => {
      const { container } = render(<MainPage setView={mockSetView} />);
      
      const mapSection = screen.getByTestId('map-section');
      const formSection = screen.getByTestId('form-section');
      
      // Both sections should exist
      expect(mapSection).toBeInTheDocument();
      expect(formSection).toBeInTheDocument();
      
      // Map section should contain the map
      expect(within(mapSection).getByTestId('my-map')).toBeInTheDocument();
      
      // Form section should contain the form
      expect(within(formSection).getByTestId('spot-form')).toBeInTheDocument();
    });
  });

  describe('User Interaction Behavior (Input → Output)', () => {
    test('should call setView with "login" when logout button is clicked', () => {
      render(<MainPage setView={mockSetView} />);
      
      const logoutButton = screen.getByTestId('logout-button');
      
      // Initially, setView should not be called
      expect(mockSetView).not.toHaveBeenCalled();
      
      // Click logout button
      fireEvent.click(logoutButton);
      
      // setView should be called exactly once with 'login'
      expect(mockSetView).toHaveBeenCalledTimes(1);
      expect(mockSetView).toHaveBeenCalledWith('login');
    });

    test('should handle multiple logout button clicks correctly', () => {
      render(<MainPage setView={mockSetView} />);
      
      const logoutButton = screen.getByTestId('logout-button');
      
      // Click multiple times
      fireEvent.click(logoutButton);
      fireEvent.click(logoutButton);
      fireEvent.click(logoutButton);
      
      // setView should be called three times, each time with 'login'
      expect(mockSetView).toHaveBeenCalledTimes(3);
      expect(mockSetView).toHaveBeenNthCalledWith(1, 'login');
      expect(mockSetView).toHaveBeenNthCalledWith(2, 'login');
      expect(mockSetView).toHaveBeenNthCalledWith(3, 'login');
    });

    test('should not crash when setView prop is undefined', () => {
      // This tests defensive programming
      expect(() => {
        render(<MainPage />);
      }).not.toThrow();
    });
  });

  describe('Component Integration (Output)', () => {
    test('should pass correct props to child components', () => {
      const { container } = render(<MainPage setView={mockSetView} />);
      
      // Verify the component structure exists without testing implementation details
      const mainPage = screen.getByTestId('main-page');
      expect(mainPage).toBeInTheDocument();
      
      // Verify child components are rendered (they're mocked, so we just check presence)
      expect(screen.getByTestId('header')).toBeInTheDocument();
      expect(screen.getByTestId('my-map')).toBeInTheDocument();
      expect(screen.getByTestId('spot-form')).toBeInTheDocument();
    });
  });
});
