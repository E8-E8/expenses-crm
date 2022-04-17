import { Button, Modal, Container, Row, Col, Form } from "react-bootstrap";
import { useState } from "react";
import api from "../../http/axios";

function CreateExpenseModal(props) {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [sum, setSum] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("one-time");
  const [currencyType, setCurrencyType] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function saveExpense() {
    const expenseData = JSON.stringify({
      name: name,
      sum: sum,
      description: description,
      type: type,
      createdBy: localStorage.getItem("userId"),
      currencyType: currencyType,
    });

    api
      .post("/expenses", expenseData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
      .then((res) => {
        handleClose();
        props.refreshExpenses();
      });
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Create an Expense
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create an Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col sm={4} className="mt-1">
                <input
                  className="form-control"
                  placeholder="Name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </Col>
              <Col sm={4} className="mt-1">
                <input
                  className="form-control"
                  placeholder="Sum"
                  onChange={(e) => {
                    setSum(e.target.value);
                  }}
                />
              </Col>
              <Col sm={4} className="mt-1">
                <Form.Select
                  onChange={(e) => {
                    setCurrencyType(e.target.value);
                  }}
                >
                  <option value="eur">EUR</option>
                  <option value="mdl">MDL</option>
                </Form.Select>
              </Col>
              <Col sm={4}></Col>

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
              <Col sm={5} className="mt-2">
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => {
                    setType(e.target.value);
                  }}
                >
                  <option value="one-time">One-time</option>
                  <option value="monthly">Monthly</option>
                </Form.Select>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => saveExpense()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateExpenseModal;
