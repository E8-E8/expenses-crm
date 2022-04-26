function Message({ messageText, createdBy, date }) {
  return (
    <li className="clearfix">
      <div className="message-data">
        <span>{createdBy}</span>
        <span className="message-data-time">{date}</span>
      </div>
      <div className="message my-message">{messageText}</div>
    </li>
  );
}

export default Message;
