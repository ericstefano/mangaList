const Control = ({ children, variants = '' }) => {
  return <div className={`control ${variants}`}>{children}</div>;
};

export { Control };
