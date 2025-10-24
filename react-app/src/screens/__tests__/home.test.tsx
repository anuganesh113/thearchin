import { render, screen } from '@testing-library/react';
import Home from '../Home';

describe('Home', () => {
  it('renders hero heading', () => {
    render(<Home />);
    expect(screen.getByRole('heading', { name: /the archin/i })).toBeInTheDocument();
  });
});
