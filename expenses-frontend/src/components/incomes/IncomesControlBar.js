import { Navbar, Container, Nav, Button, NavDropdown } from "react-bootstrap";
import CreateIncomeModal from "./CreateIncomeModal";

function IncomesControlBar(props) {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Nav>
            <CreateIncomeModal refreshIncomes={props.refreshIncomes} />
          </Nav>
          <NavDropdown
            className="me-auto"
            title="Order by date"
            id="collasible-nav-dropdown"
          >
            <NavDropdown.Item onClick={props.mostRecent}>
              Most recent
            </NavDropdown.Item>
            <NavDropdown.Item onClick={props.lessRecent}>
              Less recent
            </NavDropdown.Item>
          </NavDropdown>
        </Container>
      </Navbar>
    </>
  );
}

export default IncomesControlBar;
