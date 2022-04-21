import { Navbar, Container, Nav, Button, NavDropdown } from "react-bootstrap";
import CreateProspectModal from "./CreateProspectModal";

function ProspectsControlBar(props) {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Nav>
          <CreateProspectModal refreshProspects={props.refreshProspects} />
        </Nav>
      </Container>
    </Navbar>
  );
}

export default ProspectsControlBar;
