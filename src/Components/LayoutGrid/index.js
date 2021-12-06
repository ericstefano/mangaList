import './style.css';

const LayoutGrid = ({ children, variants = '' }) => {
  return <div className={`gridLayout ${variants}`}>{children}</div>;
};

export { LayoutGrid };
