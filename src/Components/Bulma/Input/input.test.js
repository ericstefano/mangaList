import { Input } from '.';
import { render, screen } from '@testing-library/react';
import { toHaveClass } from '@testing-library/jest-dom';
describe('Bulma Input Component', () => {
  test('Assert component renders', () => {
    render(<Input placeholder="Meu input" />);
    const input = screen.getByPlaceholderText('Meu input');
    expect(input).toBeInTheDocument();
  });

  test('Assert component has input class', () => {
    render(<Input placeholder="Meu input" />);
    const input = screen.getByPlaceholderText('Meu input');
    expect(input).toHaveClass('input');
  });

  test('Assert props are being passed', () => {
    render(<Input placeholder="Meu input" variants="mt-1" />);
    const input = screen.getByPlaceholderText('Meu input');
    expect(input).toHaveClass('mt-1');
  });
});
