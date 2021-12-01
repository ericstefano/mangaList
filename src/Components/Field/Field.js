const Search = ({ children, variants }) => {
  variants = variants ? variants : '';
  return <div className={`field ${variants}`.trimEnd()}>{children}</div>;
};

export default Search;
