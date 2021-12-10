import { Field } from '.';
import { render, screen } from '@testing-library/react';
import { toHaveClass } from '@testing-library/jest-dom';
describe('Bulma Field Component', () => {
  test('Assert component renders', () => {
    render(<Field>Hello</Field>);
    const field = screen.getByText('Hello');
    expect(field).toBeInTheDocument();
  });

  test('Assert component has field class', () => {
    render(<Field>Hello</Field>);
    const field = screen.getByText('Hello');
    expect(field).toHaveClass('field');
  });

  test('Assert props are being passed', () => {
    render(<Field variants="mt-1">Hello</Field>);
    const field = screen.getByText('Hello');
    expect(field).toHaveClass('mt-1');
  });
});
