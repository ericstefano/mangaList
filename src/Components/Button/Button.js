const Button = ({ content, type, variants, onClick }) => {
  variants = variants ? variants : '';
  return (
    <button
      type={type}
      className={`button ${variants}`.trimEnd()}
      onClick={onClick}
    >
      {content}
    </button>
  );
};

export default Button;
