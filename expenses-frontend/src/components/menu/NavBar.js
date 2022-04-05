import { Navbar, Nav, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import api from "../../http/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faUser } from "@fortawesome/free-solid-svg-icons";
import socket from "../../http/socket";

function NavBar() {
  const [balance, setBalance] = useState(0);
  const [tasksNumber, setTasksNumber] = useState(0);
  const [reload, setReload] = useState(false);

  const reloadPage = () => {
    setReload(!reload);
  };

  useEffect(() => {
    api.get("/statistics/balance").then((res) => {
      setBalance(res.data.balance);
    });
  });

  useEffect(() => {
    api
      .get("/tasks?seen=false", {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      })
      .then((res) => {
        setTasksNumber(res.data.count);
      });
    socket.on("reload-page", () => {
      reloadPage();
    });
  }, [reload, socket]);

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      className="p-0"
    >
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              <FontAwesomeIcon icon={faUser} />
            </Nav.Link>
            <Nav.Link href="/tasks" className="pe-0">
              <FontAwesomeIcon icon={faBell} />
            </Nav.Link>
            {tasksNumber > 0 ? (
              <Navbar.Text>
                <button
                  style={{
                    borderRadius: "50%",
                    width: "15px",
                    height: "15px",
                    fontSize: "8px",
                    backgroundColor: "red",
                    color: "white",
                    border: 0,
                  }}
                  className=""
                >
                  {tasksNumber}
                </button>
              </Navbar.Text>
            ) : null}
          </Nav>
          <Nav>
            <Navbar.Text>Balance: {balance}</Navbar.Text>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
