import { Button } from '.';
import { render, screen } from '@testing-library/react';
import { toHaveClass } from '@testing-library/jest-dom';

describe('Bulma Button Component', () => {
  test('Assert component has button class', () => {
    render(<Button />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('button');
  });

  test('Assert all component props are being passed', () => {
    render(
      <Button
        variants="is-danger"
        content="Hello"
        type="submit"
        onClick={() => true}
      />
    );
    const button = screen.getByRole('button');
    expect(button).toHaveClass('is-danger');
    expect(button).toHaveTextContent('Hello');
    expect(button.getAttribute('type')).toEqual('submit');
    // fazer comparação função passada
    // button.simu;
  });
});
