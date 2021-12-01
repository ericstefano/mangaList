import Field from '../Field/Field';
import Control from '../Control/Control';
import Input from '../Input/Input';
import Button from '../Button/Button';

const Search = ({
  iconLeft,
  iconButton,
  inputPlaceholder,
  variants,
  onSubmit,
}) => {
  variants = variants ? variants : '';
  return (
    <form onSubmit={onSubmit}>
      <Field variants="has-addons">
        <Control variants="has-icons-left is-expanded">
          <Input
            placeholder={inputPlaceholder}
            variants={variants.trimEnd()}
            type="search"
          />
          <span className="icon is-small is-left">{iconLeft}</span>
        </Control>
        <Control>
          <Button
            content={iconButton}
            type="submit"
            variants={variants.trimEnd()}
          />
        </Control>
      </Field>
    </form>
  );
};

export default Search;
