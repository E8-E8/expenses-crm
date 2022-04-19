import {
  Container,
  Form,
  Row,
  Col,
  Button,
  FormControl,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import api from "../../http/axios";

function SendMoney({ reloadPage, eurBalance, mdlBalance }) {
  const [users, setUsers] = useState([]);
  const [currencyType, setCurrencyType] = useState("");
  const [receiver, setReceiver] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    api
      .get("/auth/users/", {
        headers: { authorization: `Bearer ${localStorage.getItem("jwt")}` },
      })
      .then((res) => {
        setUsers(res.data.users);
      });
  });

  function sendMoney() {
    if (currencyType === "" || receiver === "" || amount === 0) {
      setErrorMessage("Please select currency type");
    } else {
      if (currencyType === "eur") {
        let senderData = {
          eurBalance: eurBalance - amount,
        };

        api
          .get(`/auth/users/${receiver}`, {
            headers: { authorization: `Bearer ${localStorage.getItem("jwt")}` },
          })
          .then((res) => {
            let receiverBalance;
            receiverBalance = res.data.user.eurBalance;
            let receiverData = {
              eurBalance: +receiverBalance + +amount,
            };

            api.patch(
              `/auth/users/${localStorage.getItem("userId")}`,
              senderData,
              {
                headers: {
                  authorization: `Bearer ${localStorage.getItem("jwt")}`,
                },
              }
            );
            api.patch(`/auth/users/${receiver}`, receiverData, {
              headers: {
                authorization: `Bearer ${localStorage.getItem("jwt")}`,
              },
            });
          })
          .then(() => {
            reloadPage();
          });
      } else if (currencyType === "mdl") {
        let senderData = {
          mdlBalance: mdlBalance - amount,
        };

        api
          .get(`/auth/users/${receiver}`, {
            headers: { authorization: `Bearer ${localStorage.getItem("jwt")}` },
          })
          .then((res) => {
            let receiverBalance;
            receiverBalance = res.data.user.mdlBalance;

            let receiverData = {
              mdlBalance: +receiverBalance + +amount,
            };

            api.patch(
              `/auth/users/${localStorage.getItem("userId")}`,
              senderData,
              {
                headers: {
                  authorization: `Bearer ${localStorage.getItem("jwt")}`,
                },
              }
            );
            api.patch(`/auth/users/${receiver}`, receiverData, {
              headers: {
                authorization: `Bearer ${localStorage.getItem("jwt")}`,
              },
            });
          })
          .then(() => {
            reloadPage();
          });
      }
    }
  }

  return (
    <Container className="mt-3">
      <h1 className="text-center mt-5">Send money</h1>
      <div className="mt-5">
        <Row>
          <Col />
          <Col>
            <div>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => {
                  setCurrencyType(e.target.value);
                }}
              >
                <option>Select currency type</option>
                <option value="eur">eur</option>
                <option value="mdl">mdl</option>
              </Form.Select>
            </div>
          </Col>
          <Col>
            <FormControl
              className="m-0"
              placeholder="Amount of money"
              aria-describedby="basic-addon1"
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            />
          </Col>
          <Col>
            <Form.Select
              aria-label="Default select example"
              onChange={(e) => {
                setReceiver(e.target.value);
              }}
            >
              <option>Select receiver</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col />
          {errorMessage ? (
            <p className="text-center mt-3" style={{ color: "red" }}>
              Something went wrong
            </p>
          ) : null}
        </Row>
        <div className="text-center mt-4">
          <Button
            onClick={() => {
              sendMoney();
            }}
            variant="success"
          >
            Send{" "}
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default SendMoney;
