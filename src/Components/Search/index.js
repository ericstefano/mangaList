import { Button, Control, Field, Input } from '../Bulma/';
import { SearchContext } from '../../Contexts/SearchContext';
import { useContext } from 'react';
import { FaSearch } from 'react-icons/fa';

const Search = ({
  iconLeft,
  inputPlaceholder,
  variants = '',
  name = 'search',
}) => {
  const { inputRef, setQuery } = useContext(SearchContext);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const pesquisa = formData.get(name);
        if (pesquisa === '') return;
        setQuery(formData.get(name));
        inputRef.current.value = '';
      }}
    >
      <Field variants="has-addons">
        <Control variants={`${iconLeft && 'has-icons-left'} is-expanded`}>
          <Input
            placeholder={inputPlaceholder}
            variants={variants}
            type="search"
            name={name}
            inputRef={inputRef}
          />
          {iconLeft && (
            <span className="icon is-small is-left">{iconLeft}</span>
          )}
        </Control>
        <Control>
          <Button content={FaSearch()} type="submit" variants={variants} />
        </Control>
      </Field>
    </form>
  );
};

export default Search;
