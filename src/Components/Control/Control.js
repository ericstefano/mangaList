const Control = ({ children, variants }) => {
  variants = variants ? variants : '';
  return <div className={`control ${variants}`.trimEnd()}>{children}</div>;
};

export default Control;
