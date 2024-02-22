import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
function Header() {
  return (
    <header>
      <Navbar expand="md" collapseOnSelect bg="dark" variant="dark">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <strong>GreenHub</strong>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className=" mx-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <FaShoppingCart /> Cart
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/signin">
                <Nav.Link>
                  <FaUserCircle /> SignIn
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
