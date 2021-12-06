const Box = ({ children, variants = '' }) => {
  return <div className={`box ${variants}`}>{children}</div>;
};

export { Box };
