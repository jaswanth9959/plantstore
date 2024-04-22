import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";

function RegisterScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pin, setPin] = useState("");
  const [country, setCountry] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      window.alert("passwords did not match!");
    } else {
      try {
        const res = await register({
          firstName,
          lastName,
          email,
          password,
          address,
          city,
          pin,
          country,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
      } catch (err) {
        // toast.error(err?.data?.message || err.error);
        window.alert(err?.data?.message || err.error);
      }
    }
  };
  return (
    <Row className="justify-content-md-center mt-5">
      <Col md={6}>
        <div className="login-container">
          {" "}
          {/* Add className */}
          <h2 className="login-heading">Login</h2> {/* Add className */}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="formBasicFN" className="form-group">
              {" "}
              {/* Add className */}
              <Form.Label className="form-label">First Name</Form.Label>{" "}
              {/* Add className */}
              <Form.Control
                type="text"
                placeholder="Enter First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicLN" className="form-group">
              {" "}
              {/* Add className */}
              <Form.Label className="form-label">Last Name</Form.Label>{" "}
              {/* Add className */}
              <Form.Control
                type="text"
                placeholder="Enter Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>
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
            <Form.Group
              controlId="formBasicConfirmPassword"
              className="form-group"
            >
              <Form.Label className="form-label">ReEnter-Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicaddress" className="form-group">
              <Form.Label className="form-label">Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasiccity" className="form-group">
              <Form.Label className="form-label">City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicpin" className="form-group">
              <Form.Label className="form-label">Pin</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Pin"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasiccountry" className="form-group">
              <Form.Label className="form-label">Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </Form.Group>

            <Button type="submit" className="submit-button">
              {" "}
              {/* Add className */}
              Sign Up
            </Button>
          </Form>
          {isLoading && <p>Loading....</p>}
        </div>
        <p>
          Have an account? <Link to="/login">Sign In</Link>
        </p>
      </Col>
    </Row>
  );
}

export default RegisterScreen;
