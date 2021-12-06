import { Button, Control, Field, Input } from '../Bulma/';

const Search = ({
  iconLeft,
  iconButton,
  inputPlaceholder,
  variants = '',
  onSubmit,
  inputRef,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <Field variants="has-addons">
        <Control variants="has-icons-left is-expanded">
          <Input
            placeholder={inputPlaceholder}
            variants={variants}
            type="search"
            name="pesquisa"
            inputRef={inputRef}
          />
          <span className="icon is-small is-left">{iconLeft}</span>
        </Control>
        <Control>
          <Button content={iconButton} type="submit" variants={variants} />
        </Control>
      </Field>
    </form>
  );
};

export default Search;
