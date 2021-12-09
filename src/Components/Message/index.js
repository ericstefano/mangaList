const Message = ({ message, variants = '' }) => {
  return (
    <p
      className={`m-0 is-italic is-size-6 has-text-weight-light has-text-centered has-text-grey ${variants}`}
    >
      {message}
    </p>
  );
};

export default Message;
