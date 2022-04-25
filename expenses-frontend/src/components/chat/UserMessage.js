function UserMessage({ messageText }) {
  return (
    <li className="clearfix">
      <div className="message-data text-right">
        <p className="message-data-time " style={{ textAlign: "right" }}>
          10:10 AM, Today
        </p>
      </div>
      <div className="message other-message float-right">{messageText}</div>
    </li>
  );
}

export default UserMessage;
