require('@testing-library/jest-dom');

// Mock window.matchMedia
global.matchMedia = global.matchMedia || function () {
  return {
    addListener: jest.fn(),
    removeListener: jest.fn(),
  };
};
