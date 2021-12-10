import { Block } from '.';
import { render, screen } from '@testing-library/react';
import { toHaveClass } from '@testing-library/jest-dom';
describe('Bulma Block Component', () => {
  test('Assert component renders', () => {
    render(<Block>Hello</Block>);
    const block = screen.getByText('Hello');
    expect(block).toBeInTheDocument();
  });

  test('Assert component has block class', () => {
    render(<Block>Hello</Block>);
    const block = screen.getByText('Hello');
    expect(block).toHaveClass('block');
  });

  test('Assert props are being passed', () => {
    render(<Block variants="mt-1">Hello</Block>);
    const block = screen.getByText('Hello');
    expect(block).toHaveClass('mt-1');
  });
});
