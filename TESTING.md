# Testing Guide

## Overview

This project now includes comprehensive test coverage with both unit tests and end-to-end (E2E) tests.

## Test Structure

```
tests/
├── e2e/                  # End-to-end tests using Playwright
│   ├── login.spec.js     # Login flow tests
│   └── main-page.spec.js # Main page functionality tests
└── unit/                 # Unit tests using Jest and React Testing Library
    ├── App.test.jsx      # App component tests
    ├── MainPage.test.jsx # MainPage component tests
    └── setup.js          # Test setup configuration
```

## Running Tests

### All Tests
```bash
npm test
```

### Unit Tests Only
```bash
npm run test:unit                 # Run unit tests once
npm run test:unit:watch           # Run in watch mode
npm run test:unit:coverage        # Run with coverage report
```

### E2E Tests Only
```bash
npm run test:e2e                  # Run E2E tests headless
npm run test:e2e:headed           # Run with browser visible
npm run test:e2e:ui               # Run with Playwright UI mode
npm run test:e2e:report           # View last test report
```

## Test Coverage

### Unit Tests
- **App Component**: Verifies main app structure and initial rendering
- **MainPage Component**: Tests main page rendering, component integration, and logout functionality

### E2E Tests

#### Login Flow
- ✅ Login page displays with all elements (username, password, buttons)
- ✅ Guest login navigates to main page
- ✅ Logout returns to login page

#### Main Page Features
- ✅ Header displays correctly
- ✅ Interactive map with zoom controls
- ✅ Parking spot form with all fields
- ✅ Form field interactions (checkboxes, radio buttons)
- ✅ Map zoom controls functionality
- ✅ Logout button works correctly

## Technologies

- **Jest**: JavaScript testing framework for unit tests
- **React Testing Library**: Testing utilities for React components
- **Playwright**: End-to-end testing framework
- **@testing-library/jest-dom**: Custom Jest matchers for DOM assertions

## Configuration Files

- `jest.config.js`: Jest configuration
- `playwright.config.js`: Playwright configuration
- `.babelrc`: Babel configuration for JSX transformation in tests

## Continuous Integration

The test suite is designed to run in CI environments. Playwright will automatically:
- Start the development server before running E2E tests
- Retry failed tests up to 2 times in CI
- Generate HTML reports and traces for debugging

## Writing New Tests

### Unit Tests
Place unit tests in `tests/unit/` with the naming pattern `*.test.jsx` or `*.test.js`.

Example:
```javascript
import { render, screen } from '@testing-library/react';
import MyComponent from '../../client/src/components/MyComponent';

describe('MyComponent', () => {
  test('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

### E2E Tests
Place E2E tests in `tests/e2e/` with the naming pattern `*.spec.js`.

Example:
```javascript
const { test, expect } = require('@playwright/test');

test('feature test', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('button')).toBeVisible();
});
```

## Debugging

### Unit Tests
```bash
npm run test:unit:watch  # Watch mode for rapid feedback
```

### E2E Tests
```bash
npm run test:e2e:ui      # Visual UI mode
npm run test:e2e:headed  # See browser actions
```

View test traces:
```bash
npx playwright show-trace test-results/[test-name]/trace.zip
```

## Best Practices

1. **Mock external dependencies** in unit tests to isolate component logic
2. **Use data-testid** attributes for stable selectors when needed
3. **Test user behavior** rather than implementation details
4. **Keep tests independent** - each test should be able to run in isolation
5. **Use descriptive test names** that explain what is being tested and expected behavior
