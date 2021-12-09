import './style.css';

const Button = ({ content, type, variants = '', onClick }) => {
  return (
    <button type={type} className={`button ${variants}`} onClick={onClick}>
      {content}
    </button>
  );
};

export { Button };
