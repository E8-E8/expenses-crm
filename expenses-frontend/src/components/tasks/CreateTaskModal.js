import { Button, Modal, Container, Row, Col, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import api from "../../http/axios";

import { io } from "socket.io-client";

const SERVER = "http://localhost:5000";

const socket = io.connect(SERVER);

async function reloadApp() {
  await socket.emit("reload-app");
}

function CreateTaskModal({ reloadPage }) {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [createdFor, setCreatedFor] = useState(localStorage.getItem("userId"));
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api
      .get("/auth/users", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
      .then((res) => {
        setUsers(res.data.users);
        reloadPage();
      });
    socket.on("reload-page", () => {
      console.log("hello");
    });
  }, [socket]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function saveTask() {
    const taskData = JSON.stringify({
      name: name,
      description: description,
      createdFor: createdFor,
    });
    console.log(taskData);
    api
      .post("/tasks", taskData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
      .then((res) => {
        reloadApp();
        handleClose();
        reloadPage();
      });
  }

  return (
    <>
      <Button variant="success" onClick={handleShow} className="me-3">
        Create a Task
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create a task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col sm={8} className="mt-1">
                <input
                  className="form-control"
                  placeholder="Task name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </Col>

              <Col sm={4} className="mt-1">
                <Form.Select
                  defaultValue={localStorage.getItem("userId")}
                  aria-label="Default select example"
                  onChange={(e) => {
                    setCreatedFor(e.target.value);
                    console.log(createdFor);
                  }}
                >
                  {users.map((user) => {
                    return (
                      <option key={user._id} value={user._id}>
                        {user.name}
                      </option>
                    );
                  })}
                </Form.Select>
              </Col>
              <Col sm={12} className="mt-3">
                <textarea
                  placeholder="Description"
                  rows={3}
                  className="form-control"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                ></textarea>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => saveTask()}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateTaskModal;
