import { Button, Modal, Container, Row, Col, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import api from "../../http/axios";

function EditIncomeModal({
  toggleEditIncomesModal,
  show,
  refreshIncomes,
  incomeId,
}) {
  const [name, setName] = useState("");
  const [sum, setSum] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [currencyType, setCurrencyType] = useState("");

  useEffect(() => {
    api
      .get(`/incomes/${incomeId}`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("jwt") },
      })
      .then((res) => {
        const income = res.data.income;
        if (income !== undefined) {
          setName(res.data.income.name);
          setSum(res.data.income.sum);
          setDescription(res.data.income.description);
          setType(res.data.income.type);
          setCurrencyType(res.data.income.currencyType);
        }
      });
  }, [show]);

  function editIncome() {
    const incomeData = JSON.stringify({
      name: name,
      sum: sum,
      description: description,
      type: type,
      createdBy: localStorage.getItem("userId"),
    });
    api
      .patch(`/incomes/${incomeId}`, incomeData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
      .then((res) => {
        toggleEditIncomesModal();
        refreshIncomes();
      });
  }

  return (
    <>
      <Modal show={show} onHide={toggleEditIncomesModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit income</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col sm={4} className="mt-1">
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
              <Col sm={4}>
                <input disabled value={currencyType} className="form-control" />
              </Col>

              <Col sm={12} className="mt-3">
                <textarea
                  value={description}
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
          <Button variant="secondary" onClick={toggleEditIncomesModal}>
            Close
          </Button>
          <Button variant="primary" onClick={() => editIncome()}>
            Edit Income
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditIncomeModal;
