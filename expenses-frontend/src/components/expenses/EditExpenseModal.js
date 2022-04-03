import { Button, Modal, Container, Row, Col, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import api from "../../http/axios";

function EditExpenseModal({
  toggleEditExpensesModal,
  show,
  refreshExpenses,
  expenseId,
}) {
  const [name, setName] = useState("");
  const [sum, setSum] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    api
      .get(`/expenses/${expenseId}`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("jwt") },
      })
      .then((res) => {
        const expense = res.data.expense;
        if (expense != undefined) {
          setName(res.data.expense.name);
          setSum(res.data.expense.sum);
          setDescription(res.data.expense.description);
          setType(res.data.expense.type);
        }
      });
  }, [show]);

  function editExpense() {
    const expenseData = JSON.stringify({
      name: name,
      sum: sum,
      description: description,
      type: type,
      createdBy: localStorage.getItem("userId"),
    });
    api
      .patch(`/expenses/${expenseId}`, expenseData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
      .then((res) => {
        toggleEditExpensesModal();
        refreshExpenses();
      });
  }

  return (
    <>
      <Modal show={show} onHide={toggleEditExpensesModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col sm={8} className="mt-1">
                <input
                  className="form-control"
                  value={name}
                  placeholder="Name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </Col>
              <Col sm={4} className="mt-1">
                <input
                  value={sum}
                  className="form-control"
                  placeholder="Sum"
                  onChange={(e) => {
                    setSum(e.target.value);
                  }}
                />
              </Col>
              <Col sm={4}></Col>

              <Col sm={12} className="mt-3">
                <textarea
                  defaultValue={description}
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
                  value={type}
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
          <Button variant="secondary" onClick={toggleEditExpensesModal}>
            Close
          </Button>
          <Button variant="primary" onClick={() => editExpense()}>
            Edit Expense
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditExpenseModal;
