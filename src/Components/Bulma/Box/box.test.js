import { Box } from '.';
import { render, screen } from '@testing-library/react';
import { toHaveClass } from '@testing-library/jest-dom';
describe('Bulma Box Component', () => {
  test('Assert component renders', () => {
    render(<Box>Hello</Box>);
    const box = screen.getByText('Hello');
    expect(box).toBeInTheDocument();
  });

  test('Assert component has box class', () => {
    render(<Box>Hello</Box>);
    const box = screen.getByText('Hello');
    expect(box).toHaveClass('box');
  });

  test('Assert props are being passed', () => {
    render(<Box variants="mt-1">Hello</Box>);
    const box = screen.getByText('Hello');
    expect(box).toHaveClass('mt-1');
  });
});
