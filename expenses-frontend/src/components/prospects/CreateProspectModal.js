import { Button, Modal, Container, Row, Col, Form } from "react-bootstrap";
import { useState } from "react";
import api from "../../http/axios";

function CreateProspectModal(props) {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function saveProspect() {
    const prospectData = JSON.stringify({
      name: name,
      company: company,
      phoneNumber: phoneNumber,
      email: email,
      serviceType: serviceType,
    });

    api
      .post("/prospects", prospectData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
      .then((res) => {
        handleClose();
        props.refreshProspects();
      });
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Create a Prospect
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create a Prospect</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col sm={6} className="mt-1">
                <input
                  className="form-control"
                  placeholder="Name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </Col>
              <Col sm={6} className="mt-1">
                <input
                  className="form-control"
                  placeholder="Company"
                  onChange={(e) => {
                    setCompany(e.target.value);
                  }}
                />
              </Col>
              <Col sm={6} className="mt-1">
                <input
                  className="form-control"
                  placeholder="Phone Number"
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                  }}
                />
              </Col>

              <Col sm={6} className="mt-2">
                <input
                  className="form-control"
                  placeholder="Email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Col>
              <Col sm={3}></Col>
              <Col>
                <Form.Select
                  onChange={(e) => {
                    setServiceType(e.target.value);
                  }}
                >
                  <option value="Logo design">Logo design</option>
                  <option value="Brand book">Brand book</option>
                  <option value="Social media design">
                    Social media design
                  </option>
                  <option value="Ip telephony">Ip telephony</option>
                  <option value="E-commerce website">E-commerce website</option>
                  <option value="CRM">CRM</option>
                  <option value="Web audit">Web audit</option>
                </Form.Select>
              </Col>
              <Col sm={3}></Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => saveProspect()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateProspectModal;
