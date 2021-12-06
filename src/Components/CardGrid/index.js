import './style.css';

const CardGrid = ({ children, variants = '' }) => {
  return <div className={`gridCard ${variants}`}>{children}</div>;
};

export default CardGrid;
