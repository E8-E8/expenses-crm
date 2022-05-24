import { useState, useEffect } from "react";
import api from "../../http/axios";
import { Modal, Button, Col, Row, Form } from "react-bootstrap";

function InfoSection({
  prospectId,
  show,
  refreshProspects,
  toggleShowEditModal,
}) {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [brand, setBrand] = useState("");
  const [position, setPosition] = useState("");
  const [website, setWebsite] = useState("");
  const [country, setCountry] = useState("");
  const [question1, setQuestion1] = useState({
    answer: "",
    services: [],
    pages: "",
    price: "",
  });
  const [question2, setQuestion2] = useState({
    answer: "",
    services: [],
    price: "",
  });
  const [question3, setQuestion3] = useState({
    answer: "",
    services: [],
    price: "",
  });

  const [question4, setQuestion4] = useState("");
  const [question5, setQuestion5] = useState("");

  useEffect(() => {
    api
      .get(`/prospects/${prospectId}`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("jwt") },
      })
      .then((res) => {
        const prospect = res.data.prospect;
        if (prospect !== null) {
          setFullname(prospect.fullname);
          setEmail(prospect.email);
          setCountry(prospect.country);
          setBrand(prospect.brand);
          setPosition(prospect.position);
          setWebsite(prospect.website);
          setQuestion1(prospect.question1);
          setQuestion2(prospect.question2);
          setQuestion3(prospect.question3);
          setQuestion4(prospect.question4);
          setQuestion5(prospect.question5);
          console.log(prospect);
        }
      });
  }, [show]);

  return (
    <>
      <Modal.Body>
        <Row>
          <Col sm={4}>
            <label>Fullname</label>
            <input className="form-control" value={fullname} disabled={true} />
          </Col>
          <Col sm={4}>
            <label>Email</label>
            <input className="form-control" value={email} disabled={true} />
          </Col>

          <Col sm={4}>
            <label>Country</label>
            <input className="form-control" value={country} disabled={true} />
          </Col>

          <Col className="mt-1" sm={4}>
            <label>Brand</label>
            <input
              className="form-control"
              value={brand}
              disabled={true}
            ></input>
          </Col>
          <Col className="mt-1" sm={4}>
            <label>Position</label>
            <input
              className="form-control"
              value={position}
              disabled={true}
            ></input>
          </Col>
          <Col className="mt-1" sm={4}>
            <label>Website</label>
            <input
              className="form-control"
              value={website}
              disabled={true}
            ></input>
          </Col>
          <hr className="mt-3"></hr>
          <Col sm={4}>
            <p className="text-center mb-0 mt-2">Do you require a website?</p>
            <Row className="mt-1  ">
              <p>Answer: {question1.answer ? "yes" : "no"}</p>
            </Row>
            {question1.answer && (
              <div>
                <Row>
                  <p>Services: {question1.services.join(", ")}</p>
                </Row>
                <Row>
                  <p>Pages: {question1.pages}</p>
                </Row>
                <Row>
                  <p>Price: {question1.price}</p>
                </Row>
              </div>
            )}
          </Col>
          <Col sm={4}>
            <p className="text-center mb-0 mt-2">
              Do you require a logo and/or branding?
            </p>
            <Row className="mt-2  ">
              <p>Answer: {question2.answer ? "yes" : "no"}</p>
            </Row>
            {question2.answer && (
              <div>
                <Row>
                  <p>Services: {question2.services.join(", ")}</p>
                </Row>
                <Row>
                  <p>Price: {question2.price}</p>
                </Row>
              </div>
            )}
          </Col>
          <Col sm={4}>
            <p className="text-center mb-0 mt-2">
              Do you require social media marketing?
            </p>
            <Row className="mt-2  ">
              <p>Answer: {question3.answer ? "yes" : "no"}</p>
            </Row>
            {question3.answer && (
              <div>
                <Row>
                  <p>Services: {question3.services.join(", ")}</p>
                </Row>
                <Row>
                  <p>Price: {question3.price}</p>
                </Row>
              </div>
            )}
          </Col>
          <hr></hr>
          <Col className="text-center" sm={6}>
            <p>How old is your brand / business?</p>
            <p>Answer: {question4}</p>
          </Col>
          <Col className="text-center" sm={6}>
            <p>When should we start?</p>
            <p>Answer: {question5}</p>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={toggleShowEditModal}>
          Close
        </Button>
      </Modal.Footer>
    </>
  );
}

export default InfoSection;
