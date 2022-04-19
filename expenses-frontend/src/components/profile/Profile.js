import { Container, Row, Col, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import api from "../../http/axios";
import EurToMdlExchanger from "./EurToMdlExchanger";
import MdlToEurExchanger from "./MdlToEurExchanger";
import { faArrowRightArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SendMoney from "./SendMoney";

function Profile() {
  const [mdlBalance, setMdlBalance] = useState(0);
  const [eurBalance, setEurBalance] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [exchangerType, setExchangerType] = useState("mdlToEur");
  const [reload, setReload] = useState(false);

  useEffect(() => {
    api
      .get(`/auth/users/${localStorage.getItem("userId")}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
      .then((res) => {
        setEurBalance(parseFloat(res.data.user.eurBalance).toFixed(2));
        setMdlBalance(parseFloat(res.data.user.mdlBalance).toFixed(2));
        setName(res.data.user.name);
        setEmail(res.data.user.email);
      });
  }, [reload]);

  function reloadPage() {
    setReload(!reload);
    console.log("reloaded");
  }
  function changeExchanger() {
    if (exchangerType === "eurToMdl") {
      setExchangerType("mdlToEur");
    } else {
      setExchangerType("eurToMdl");
    }
  }

  let exchanger;
  if (exchangerType === "eurToMdl") {
    exchanger = <EurToMdlExchanger reloadPage={reloadPage} />;
  }
  if (exchangerType === "mdlToEur") {
    exchanger = <MdlToEurExchanger reloadPage={reloadPage} />;
  }

  return (
    <>
      <Container>
        <h1 className="text-center mt-5">Profile</h1>
        <div className="mt-5">
          <Row>
            <Col />
            <Col>
              <h3>Name: {name}</h3>
            </Col>
            <Col>
              <h3>Email: {email}</h3>
            </Col>
            <Col />
          </Row>
          <Row className="mt-4">
            <Col />
            <div className="col text-center">
              <p>EUR: {eurBalance}</p>
            </div>
            <div className="col text-center">
              <p>MDL: {mdlBalance}</p>
            </div>
            <Col />
          </Row>
          <div className="text-center mt-5">
            <Button onClick={() => changeExchanger()}>
              <FontAwesomeIcon icon={faArrowRightArrowLeft} />
            </Button>
          </div>

          {exchanger}
          <div className="text-center mt-2">
            <Button variant="warning" href="/expenses">
              Go Back
            </Button>
          </div>
        </div>
      </Container>
      <SendMoney
        reloadPage={reloadPage}
        mdlBalance={mdlBalance}
        eurBalance={eurBalance}
      />
    </>
  );
}

export default Profile;
