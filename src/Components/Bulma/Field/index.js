const Field = ({ children, variants = '' }) => {
  return <div className={`field ${variants}`}>{children}</div>;
};

export { Field };
