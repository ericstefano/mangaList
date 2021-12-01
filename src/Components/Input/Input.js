const Input = ({ type, value, placeholder, variants, style, onChange }) => {
  variants = variants ? variants : '';

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      className={`input ${variants}`.trimEnd()}
      style={style}
      onChange={onChange}
      name="pesquisa"
    ></input>
  );
};

export default Input;
