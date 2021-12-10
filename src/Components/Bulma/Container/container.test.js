import { Container } from '.';
import { render, screen } from '@testing-library/react';
import { toHaveClass } from '@testing-library/jest-dom';
describe('Bulma Container Component', () => {
  test('Assert component renders', () => {
    render(<Container>Meu container</Container>);
    const container = screen.getByText('Meu container');
    expect(container).toBeInTheDocument();
  });

  test('Assert component has container class', () => {
    render(<Container>Meu container</Container>);
    const container = screen.getByText('Meu container');
    expect(container).toHaveClass('container');
  });

  test('Assert props are being passed', () => {
    render(<Container variants="mt-1">Meu container</Container>);
    const container = screen.getByText('Meu container');
    expect(container).toHaveClass('mt-1');
  });
});
