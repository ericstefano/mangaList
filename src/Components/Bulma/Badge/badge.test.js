import { Badge } from '.';
import { render, screen } from '@testing-library/react';
import { toHaveClass } from '@testing-library/jest-dom';
describe('Bulma Badge Component', () => {
  test('Assert component has render', () => {
    render(<Badge content="Hello"></Badge>);
    const badge = screen.getByText('Hello');
    expect(badge).toBeInTheDocument();
  });

  test('Assert component has tag h-0 class', () => {
    render(<Badge content="Hello"></Badge>);
    const badge = screen.getByText('Hello');
    expect(badge).toHaveClass('tag h-0');
  });

  test('Assert component props are being passed', () => {
    render(<Badge content="Hey again" variants="is-danger"></Badge>);
    const badge = screen.getByText('Hey again');
    expect(badge).toHaveClass('is-danger');
  });
});
