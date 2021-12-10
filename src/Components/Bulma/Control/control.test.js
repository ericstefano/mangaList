import { Control } from '.';
import { render, screen } from '@testing-library/react';
import { toHaveClass } from '@testing-library/jest-dom';
describe('Bulma Control Component', () => {
  test('Assert component renders', () => {
    render(<Control>Hello</Control>);
    const control = screen.getByText('Hello');
    expect(control).toBeInTheDocument();
  });

  test('Assert component has control class', () => {
    render(<Control>Hello</Control>);
    const control = screen.getByText('Hello');
    expect(control).toHaveClass('control');
  });

  test('Assert props are being passed', () => {
    render(<Control variants="mt-1">Hello</Control>);
    const control = screen.getByText('Hello');
    expect(control).toHaveClass('mt-1');
  });
});
