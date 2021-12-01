import './Tag.css';

const Tag = ({ content, variants }) => {
  variants = variants ? variants : '';
  return <div className={`tag h-0  ${variants}`}>{content}</div>;
};

export default Tag;
