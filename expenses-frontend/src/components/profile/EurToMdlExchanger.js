import { Form, Row, Col, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import api from "../../http/axios";

function EurToMdlExchanger({ reloadPage }) {
  const [mdlBalance, setMdlBalance] = useState(0);
  const [eurBalance, setEurBalance] = useState(0);
  const [exchangeEur, setExchangeEur] = useState(1);
  const [exchangeMdl, setExchangeMdl] = useState(0);
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
    setExchangeMdl(parseFloat(rate * exchangeEur).toFixed(2));
  }, [exchangeEur, exchangeMdl, rate]);

  function exchangeEurToMdl(eurBalance, exchangeEur, mdlBalance, exchangeMdl) {
    let exchangeData = {
      eurBalance: +eurBalance - +exchangeEur,
      mdlBalance: +exchangeMdl + +mdlBalance,
    };
    console.log(exchangeData);
    console.log(eurBalance, exchangeEur, mdlBalance, exchangeMdl);
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
            <Form.Label className="text-center">EUR</Form.Label>
            <Form.Control
              type="number"
              placeholder="EUR"
              onChange={(e) => {
                setExchangeEur(e.target.value);
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
            <Form.Label className="text-center">MDL</Form.Label>
            <Form.Control
              disabled
              type="number"
              placeholder="MDL"
              value={exchangeMdl}
            />
          </Form.Group>
        </Col>
        <Col />
      </Row>
      <div className="text-center mt-4">
        <Button
          onClick={() => {
            exchangeEurToMdl(eurBalance, exchangeEur, mdlBalance, exchangeMdl);
            reloadPage();
          }}
        >
          Exchange
        </Button>
      </div>
    </>
  );
}

export default EurToMdlExchanger;
