import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../../client/src/App';

// Mock Grommet to avoid complex dependency issues
jest.mock('grommet', () => ({
  Grommet: ({ children }) => <div>{children}</div>,
}));

// Mock child components
jest.mock('../../client/src/components/login/Login', () => {
  return function MockLogin() {
    return <div data-testid="login-component">Login Component</div>;
  };
});

jest.mock('../../client/src/components/MainPage', () => {
  return function MockMainPage() {
    return <div data-testid="main-page-component">Main Page Component</div>;
  };
});

describe('App Component', () => {
  test('renders without crashing', () => {
    render(<App />);
  });

  test('initially renders login view', () => {
    render(<App />);
    expect(screen.getByTestId('login-component')).toBeInTheDocument();
  });

  test('renders app with Grommet wrapper', () => {
    const { container } = render(<App />);
    expect(container.firstChild).toBeTruthy();
  });
});
