import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../../client/src/App';

// Mock Grommet to avoid complex dependency issues
jest.mock('grommet', () => ({
  Grommet: ({ children }) => <div data-testid="grommet-wrapper">{children}</div>,
}));

// Mock child components with realistic behavior
jest.mock('../../client/src/components/login/Login', () => {
  return function MockLogin({ setView }) {
    return (
      <div data-testid="login-component">
        <button onClick={() => setView && setView('main')} data-testid="mock-login-button">
          Guest Login
        </button>
      </div>
    );
  };
});

jest.mock('../../client/src/components/MainPage', () => {
  return function MockMainPage({ setView }) {
    return (
      <div data-testid="main-page-component">
        <button onClick={() => setView && setView('login')} data-testid="mock-logout-button">
          Logout
        </button>
      </div>
    );
  };
});

describe('App Component - Input/Output Behavior', () => {
  describe('Initial Rendering (Output)', () => {
    test('should render with Grommet theme wrapper', () => {
      render(<App />);
      
      const wrapper = screen.getByTestId('grommet-wrapper');
      expect(wrapper).toBeInTheDocument();
    });

    test('should initially render login view by default', () => {
      render(<App />);
      
      // Login component should be visible initially
      expect(screen.getByTestId('login-component')).toBeInTheDocument();
      
      // Main page component should not be visible
      expect(screen.queryByTestId('main-page-component')).not.toBeInTheDocument();
    });

    test('should have a functioning state management system', () => {
      const { container } = render(<App />);
      
      // Verify the app container exists
      expect(container.firstChild).toBeTruthy();
      
      // Verify initial state by checking which view is rendered
      expect(screen.getByTestId('login-component')).toBeInTheDocument();
    });
  });

  describe('View Navigation (Input → Output)', () => {
    test('should switch from login view to main page when user triggers navigation', () => {
      render(<App />);
      
      // Initially on login view
      expect(screen.getByTestId('login-component')).toBeInTheDocument();
      expect(screen.queryByTestId('main-page-component')).not.toBeInTheDocument();
      
      // Simulate user action that triggers view change
      const loginButton = screen.getByTestId('mock-login-button');
      fireEvent.click(loginButton);
      
      // Should now show main page
      expect(screen.queryByTestId('login-component')).not.toBeInTheDocument();
      expect(screen.getByTestId('main-page-component')).toBeInTheDocument();
    });

    test('should switch from main page back to login when user logs out', () => {
      render(<App />);
      
      // Navigate to main page
      const loginButton = screen.getByTestId('mock-login-button');
      fireEvent.click(loginButton);
      
      // Verify on main page
      expect(screen.getByTestId('main-page-component')).toBeInTheDocument();
      
      // Navigate back to login
      const logoutButton = screen.getByTestId('mock-logout-button');
      fireEvent.click(logoutButton);
      
      // Should be back on login view
      expect(screen.getByTestId('login-component')).toBeInTheDocument();
      expect(screen.queryByTestId('main-page-component')).not.toBeInTheDocument();
    });

    test('should handle multiple view transitions correctly', () => {
      render(<App />);
      
      // Start on login
      expect(screen.getByTestId('login-component')).toBeInTheDocument();
      
      // Go to main
      fireEvent.click(screen.getByTestId('mock-login-button'));
      expect(screen.getByTestId('main-page-component')).toBeInTheDocument();
      
      // Back to login
      fireEvent.click(screen.getByTestId('mock-logout-button'));
      expect(screen.getByTestId('login-component')).toBeInTheDocument();
      
      // To main again
      fireEvent.click(screen.getByTestId('mock-login-button'));
      expect(screen.getByTestId('main-page-component')).toBeInTheDocument();
    });
  });

  describe('Component Props (Input → Output)', () => {
    test('should pass setView callback to Login component and it should work', () => {
      render(<App />);
      
      // Login component should receive setView and be able to use it
      const loginButton = screen.getByTestId('mock-login-button');
      expect(loginButton).toBeInTheDocument();
      
      // Initially on login
      expect(screen.getByTestId('login-component')).toBeInTheDocument();
      
      // Trigger view change
      fireEvent.click(loginButton);
      
      // View should change (proving setView was passed correctly)
      expect(screen.getByTestId('main-page-component')).toBeInTheDocument();
      expect(screen.queryByTestId('login-component')).not.toBeInTheDocument();
    });

    test('should pass setView callback to MainPage component and it should work', () => {
      render(<App />);
      
      // Navigate to main page first
      fireEvent.click(screen.getByTestId('mock-login-button'));
      
      // MainPage component should receive setView and be able to use it
      const logoutButton = screen.getByTestId('mock-logout-button');
      expect(logoutButton).toBeInTheDocument();
      
      // Currently on main page
      expect(screen.getByTestId('main-page-component')).toBeInTheDocument();
      
      // Trigger view change
      fireEvent.click(logoutButton);
      
      // View should change (proving setView was passed correctly)
      expect(screen.getByTestId('login-component')).toBeInTheDocument();
      expect(screen.queryByTestId('main-page-component')).not.toBeInTheDocument();
    });
  });
});
