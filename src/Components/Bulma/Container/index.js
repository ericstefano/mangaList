const Container = ({ children, variants = '' }) => {
  return <div className={`container ${variants}`}>{children}</div>;
};

export { Container };
