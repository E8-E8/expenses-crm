import { Container, Row, Col, Button } from "react-bootstrap";
import "../../css/chat.css";
import { useRef, useEffect, useState } from "react";
import UserMessage from "./UserMessage";
import Message from "./Message";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "../../http/axios";
import socket from "../../http/socket";

async function refreshPage() {
  await socket.emit("new-message");
}

function Chat() {
  const chat = useRef(null);
  const { date, setDate } = useState("");
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [reload, setReload] = useState(false);

  useEffect(() => {
    api
      .get("/messages", {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      })
      .then((res) => {
        setMessages(res.data.messages);
      });

    socket.on("reload-messages-page", () => {
      reloadPage();
    });
  }, [socket, reload]);

  useEffect(() => {
    chat.current.scrollIntoView({ behavior: "smooth", block: "end" });
  });
  function reloadPage() {
    setReload(!reload);
  }

  const checkIfEnterIsClicked = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const sendMessage = () => {
    if (messageText === "") return;
    const messageData = {
      text: messageText,
    };
    api
      .post("/messages", messageData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      })
      .then(() => {
        refreshPage();
      });
    setMessageText("");
  };

  return (
    <div className="container">
      <div className="row clearfix">
        <div className="col-lg-12">
          <div className="card chat-app">
            <div className="chat">
              <div className="chat-header clearfix">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="chat-about">
                      <h6 className="m-b-0">
                        {localStorage.getItem("userName")}
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="chat-history scroll">
                <ul className="m-b-0 " ref={chat}>
                  {messages.map((message) => {
                    const date = new Date(message.createdAt);
                    console.log(date);
                    if (message.createdBy === localStorage.getItem("userId")) {
                      return (
                        <UserMessage
                          key={message._id}
                          messageText={message.text}
                        />
                      );
                    } else {
                      return (
                        <Message
                          key={message._id}
                          messageText={message.text}
                          createdBy={message.createdByName}
                        />
                      );
                    }
                  })}
                </ul>
              </div>
              <div className="chat-message clearfix">
                <div className="input-group mb-0">
                  <div className="input-group-prepend">
                    <Button onClick={() => sendMessage()}>
                      <FontAwesomeIcon icon={faPaperPlane} />
                    </Button>
                  </div>
                  <input
                    onKeyPress={checkIfEnterIsClicked}
                    value={messageText}
                    type="text"
                    className="form-control m-0"
                    placeholder="Enter your message here..."
                    onChange={(e) => setMessageText(e.target.value)}
                    rows={1}
                    style={{ resize: "none" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
