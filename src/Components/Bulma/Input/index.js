const Input = ({ type, placeholder, name, variants = '', inputRef }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`input ${variants}`}
      name={name}
      ref={inputRef}
    />
  );
};

export { Input };
