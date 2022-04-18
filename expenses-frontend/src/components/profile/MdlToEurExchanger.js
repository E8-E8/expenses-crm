import { Form, Row, Col, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import api from "../../http/axios";

function MdlToEurExchanger({ reloadPage }) {
  const [mdlBalance, setMdlBalance] = useState(0);
  const [eurBalance, setEurBalance] = useState(0);
  const [exchangeEur, setExchangeEur] = useState(0);
  const [exchangeMdl, setExchangeMdl] = useState(1);
  const [rate, setRate] = useState(0);

  useEffect(() => {
    api
      .get(`/auth/users/${localStorage.getItem("userId")}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
      .then((res) => {
        setEurBalance(res.data.user.eurBalance);
        setMdlBalance(res.data.user.mdlBalance);
      });
  }, [mdlBalance, eurBalance, rate, exchangeMdl, exchangeEur]);

  useEffect(() => {
    setExchangeEur(parseFloat((1 / rate) * exchangeMdl).toFixed(2));
  }, [exchangeEur, exchangeMdl, rate]);

  function exchangeMdlToEur(eurBalance, exchangeEur, mdlBalance, exchangeMdl) {
    let exchangeData = {
      eurBalance: +eurBalance + +exchangeEur,
      mdlBalance: +mdlBalance - +exchangeMdl,
    };
    console.log(exchangeData);
    api.patch(`/auth/users/${localStorage.getItem("userId")}`, exchangeData, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    reloadPage();
  }

  return (
    <>
      <Row>
        <Col />
        <Col>
          <Form.Group className="mt-3" controlId="formBasicEmail">
            <Form.Label className="text-center">MLD</Form.Label>
            <Form.Control
              type="number"
              placeholder="MDL"
              onChange={(e) => {
                setExchangeMdl(e.target.value);
              }}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mt-3" controlId="formBasicEmail">
            <Form.Label className="text-center">RATE</Form.Label>
            <Form.Control
              type="number"
              placeholder="RATE"
              onChange={(e) => {
                setRate(e.target.value);
              }}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mt-3" controlId="formBasicEmail">
            <Form.Label className="text-center">EUR</Form.Label>
            <Form.Control
              disabled
              type="number"
              placeholder="EUR"
              value={exchangeEur}
            />
          </Form.Group>
        </Col>
        <Col />
      </Row>
      <div className="text-center mt-4">
        <Button
          onClick={() =>
            exchangeMdlToEur(eurBalance, exchangeEur, mdlBalance, exchangeMdl)
          }
        >
          Exchange
        </Button>
      </div>
    </>
  );
}

export default MdlToEurExchanger;
