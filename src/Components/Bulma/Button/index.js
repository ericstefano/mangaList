import './style.css';
const Button = ({ content, type, variants = '', styleVariants, onClick }) => {
  return (
    <button
      type={type}
      className={`button ${variants}`}
      style={styleVariants}
      onClick={onClick}
    >
      {content}
    </button>
  );
};

export { Button };
