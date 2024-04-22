import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
function Header() {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
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
              {userInfo ? (
                userInfo.role !== "user" ? (
                  <>
                    <LinkContainer to="/dashboard/cart">
                      <Nav.Link>
                        <FaShoppingCart /> Cart
                      </Nav.Link>
                    </LinkContainer>
                    <NavDropdown title={userInfo.firstName} id="username">
                      <LinkContainer to="/dashboard">
                        <NavDropdown.Item>dashboard</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/staffprofile">
                        <NavDropdown.Item>Profile</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Item onClick={logoutHandler}>
                        Logout
                      </NavDropdown.Item>
                    </NavDropdown>
                  </>
                ) : (
                  <>
                    <Nav.Link>
                      <p>Welcome {userInfo.firstName}</p>
                    </Nav.Link>
                    <LinkContainer to="/cart">
                      <Nav.Link>
                        <FaShoppingCart /> Cart
                      </Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/profile">
                      <Nav.Link>Profile</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/myorders">
                      <Nav.Link>My Orders</Nav.Link>
                    </LinkContainer>
                    <Nav.Link onClick={logoutHandler}>LogOut</Nav.Link>{" "}
                  </>
                )
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <FaUserCircle /> SignIn
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
