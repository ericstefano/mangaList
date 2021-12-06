const Block = ({ children, variants = '' }) => {
  return <div className={`block ${variants}`}>{children}</div>;
};

export { Block };
