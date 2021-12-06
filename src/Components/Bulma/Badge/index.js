import './style.css';
const Badge = ({ content, variants = '' }) => {
  return <div className={`tag h-0 ${variants}`}>{content}</div>;
};

export { Badge };
