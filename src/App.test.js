import { render, screen } from '@testing-library/react';
import App from './App';

test('renders price', () => {
  render(<App />);
  const priceElement = screen.getByText(/price/i);
  expect(priceElement).toBeInTheDocument();
});
