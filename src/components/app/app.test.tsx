import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './app';

test('renders the title of  the app', () => {
  render(<App />);
  const h1 = screen.getByText(/todos/i);
  expect(h1).toBeInTheDocument();
});
