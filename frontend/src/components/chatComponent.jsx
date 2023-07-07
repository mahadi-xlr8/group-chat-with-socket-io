const ChatComponent = (props) => {
  const letter = props.username[0].toUpperCase();
  return (
    <span
      className={
        props.me ? "chat-component my-text" : "other-text chat-component"
      }
    >
      <span className="user-img" title={props.username}>
        {letter}
      </span>
      <p title={props.time}>{props.text}</p>
    </span>
  );
};

export default ChatComponent;
