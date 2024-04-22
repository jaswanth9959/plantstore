import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useStaffLoginMutation } from "../slices/staffApiSlice";
import { setCredentials } from "../slices/authSlice";

function StaffLoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [stafflogin, { isLoading }] = useStaffLoginMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await stafflogin({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/dashboard");
    } catch (err) {
      // toast.error(err?.data?.message || err.error);
      window.alert(err?.data?.message || err.error);
    }
  };
  return (
    <Row className="justify-content-md-center mt-5">
      <Col md={6}>
        <div className="login-container">
          {" "}
          {/* Add className */}
          <h2 className="login-heading">Staff Login</h2> {/* Add className */}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="formBasicEmail" className="form-group">
              {" "}
              {/* Add className */}
              <Form.Label className="form-label">Email address</Form.Label>{" "}
              {/* Add className */}
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="form-group">
              {" "}
              {/* Add className */}
              <Form.Label className="form-label">Password</Form.Label>{" "}
              {/* Add className */}
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button type="submit" className="submit-button">
              {" "}
              {/* Add className */}
              Log In
            </Button>
          </Form>
          {isLoading && <p>Loading....</p>}
        </div>
        <p>
          Don't have account? <Link to="/register">Sign Up</Link>
        </p>
      </Col>
    </Row>
  );
}

export default StaffLoginScreen;
