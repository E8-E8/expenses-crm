import { Navbar, Container, Nav, Button, NavDropdown } from "react-bootstrap";
import CreateExpenseModal from "./CreateExpenseModal";

function ExpensesControlBar(props) {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Nav>
            <CreateExpenseModal refreshExpenses={props.refreshExpenses} />
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
          <Navbar.Text>Current balance: {props.balance}</Navbar.Text>
        </Container>
      </Navbar>
    </>
  );
}

export default ExpensesControlBar;
