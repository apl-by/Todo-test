import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './app';

test('renders learn react link', () => {
  render(<App />);
  const h1 = screen.getByText(/todos/i);
  expect(h1).toBeInTheDocument();
});
