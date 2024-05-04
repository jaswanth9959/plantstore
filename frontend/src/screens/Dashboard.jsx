import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
function Dashboard() {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo.first) {
      navigate("/staffprofile");
    }
  }, [userInfo, navigate]);

  return (
    <div>
      <main className="py-3">
        <Container>
          <Row>
            <Col md={3} className="sidebar">
              <Navbar bg="light" expand="lg" className="flex-column">
                <Navbar.Brand>Welcome, {userInfo.firstName}</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="flex-column">
                    <LinkContainer to="/dashboard/orders">
                      <Nav.Link>Orders</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/dashboard/plants">
                      <Nav.Link>Plants</Nav.Link>
                    </LinkContainer>
                    {userInfo.role === "admin" && (
                      <>
                        <LinkContainer to="/dashboard/staff">
                          <Nav.Link>Staff</Nav.Link>
                        </LinkContainer>
                      </>
                    )}
                    <LinkContainer to="/dashboard/users">
                      <Nav.Link>Customers</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/dashboard/fertilizers">
                      <Nav.Link>Fertilzers and pots</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/dashboard/services">
                      <Nav.Link>Services</Nav.Link>
                    </LinkContainer>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
            </Col>
            <Col md={9} className="content">
              {/* Main content goes here */}
              <Outlet />
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
}

export default Dashboard;
