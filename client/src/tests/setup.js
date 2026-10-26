import '@testing-library/jest-dom';

// Mock window.scrollTo for jsdom test environment
window.scrollTo = () => {};
