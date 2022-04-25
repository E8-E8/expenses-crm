function Message({ messageText, createdBy }) {
  return (
    <li className="clearfix">
      <div className="message-data">
        <span>{createdBy}</span>
        <span className="message-data-time">10:12 AM, Today</span>
      </div>
      <div className="message my-message">{messageText}</div>
    </li>
  );
}

export default Message;
