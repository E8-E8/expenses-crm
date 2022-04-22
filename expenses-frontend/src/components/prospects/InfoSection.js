import { useState, useEffect } from "react";
import api from "../../http/axios";
import { Modal, Button, Col, Row, Form } from "react-bootstrap";

function InfoSection({
  prospectId,
  show,
  refreshProspects,
  toggleShowEditModal,
}) {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  function editProspect() {
    const prospectData = JSON.stringify({
      name: name,
      company: company,
      serviceType: serviceType,
      email: email,
      phoneNumber: phoneNumber,
    });
    api
      .patch(`/prospects/${prospectId}`, prospectData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
      .then((res) => {
        toggleShowEditModal();
        refreshProspects();
      });
  }

  useEffect(() => {
    api
      .get(`/prospects/${prospectId}`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("jwt") },
      })
      .then((res) => {
        const prospect = res.data.prospect;
        if (prospect !== undefined) {
          setName(prospect.name);
          setCompany(prospect.company);
          setServiceType(prospect.serviceType);
          setEmail(prospect.email);
          setPhoneNumber(prospect.phoneNumber);
        }
      });
  }, [show]);

  return (
    <>
      <Modal.Body>
        <Row>
          <Col sm={4}>
            <input
              className="form-control"
              value={name}
              placeholder="Name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </Col>
          <Col sm={4}>
            <input
              className="form-control"
              value={company}
              placeholder="Company"
              onChange={(e) => {
                setCompany(e.target.value);
              }}
            />
          </Col>
          <Col sm={4}>
            <input
              className="form-control"
              value={email}
              placeholder="Email"
              onChange={(e) => {
                setCompany(e.target.value);
              }}
            />
          </Col>
          <Col sm={2} />
          <Col className="mt-1" sm={4}>
            <input
              className="form-control"
              value={phoneNumber}
              placeholder="Phone number"
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
            />
          </Col>
          <Col className="mt-1" sm={4}>
            <Form.Select
              value={serviceType}
              onChange={(e) => {
                setServiceType(e.target.value);
              }}
            >
              <option value="Logo design">Logo design</option>
              <option value="Brand book">Brand book</option>
              <option value="Social media design">Social media design</option>
              <option value="Ip telephony">Ip telephony</option>
              <option value="E-commerce website">E-commerce website</option>
              <option value="CRM">CRM</option>
              <option value="Web audit">Web audit</option>
            </Form.Select>
          </Col>
          <Col sm={2} />
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={toggleShowEditModal}>
          Close
        </Button>
        <Button variant="primary" onClick={() => editProspect()}>
          Edit Expense
        </Button>
      </Modal.Footer>
    </>
  );
}

export default InfoSection;
