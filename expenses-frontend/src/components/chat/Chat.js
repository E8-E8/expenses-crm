import { Container, Row, Col, Button } from "react-bootstrap";
import "../../css/chat.css";
import { useRef, useEffect } from "react";
import UserMessage from "./UserMessage";
import Message from "./Message";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "../../http/axios";
import socket from "../../http/socket";

function Chat() {
  const chat = useRef(null);

  useEffect(() => {
    chat.current.scrollIntoView({ behavior: "smooth", block: "end" });
  }, []);

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
                      <h6 className="m-b-0">Aiden Chavez</h6>
                      <small>Last seen: 2 hours ago</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="chat-history scroll">
                <ul className="m-b-0 " ref={chat}>
                  <UserMessage messageText={"kflasjdflasjf;aklsdjf"} />
                  <Message
                    createdBy={"user"}
                    messageText={"kflasjdflasjf;aklsdjf"}
                  />
                </ul>
              </div>
              <div className="chat-message clearfix">
                <div className="input-group mb-0">
                  <div className="input-group-prepend">
                    <Button>
                      <FontAwesomeIcon icon={faPaperPlane} />
                    </Button>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter text here..."
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
