import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCreateStaffMutation } from "../slices/staffApiSlice";
import { LinkContainer } from "react-router-bootstrap";
function StaffAdd() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [ssn, setSsn] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const [createStaff, { isLoading }] = useCreateStaffMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      window.alert("passwords did not match!");
    } else {
      try {
        await createStaff({
          firstName,
          lastName,
          email,
          ssn,
          password,
        }).unwrap();
        navigate("/dashboard/staff");
      } catch (err) {
        // toast.error(err?.data?.message || err.error);
        window.alert(err?.data?.message || err.error);
      }
    }
  };
  return (
    <Row className="justify-content-md-center mt-5">
      <Col md={6}>
        <LinkContainer to="/dashboard/staff">
          <Button variant="dark">Back</Button>
        </LinkContainer>
        <div className="login-container mt-3">
          {" "}
          {/* Add className */}
          <h2 className="login-heading">Staff Registration</h2>{" "}
          {/* Add className */}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="formBasicEmail1" className="form-group">
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

            <Form.Group controlId="formBasicEmail2" className="form-group">
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

            <Form.Group controlId="formBasicEmail3" className="form-group">
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

            <Form.Group controlId="formBasicSSn" className="form-group">
              {" "}
              {/* Add className */}
              <Form.Label className="form-label">SSn</Form.Label>{" "}
              {/* Add className */}
              <Form.Control
                type="text"
                placeholder="Enter Social Security Number"
                value={ssn}
                onChange={(e) => setSsn(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword1" className="form-group">
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
            <Form.Group controlId="formBasicPassword" className="form-group">
              {" "}
              {/* Add className */}
              <Form.Label className="form-label">
                Confirm Password
              </Form.Label>{" "}
              {/* Add className */}
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
            <Button type="submit" variant="dark">
              {" "}
              {/* Add className */}
              Add
            </Button>
          </Form>
          {isLoading && <p>Loading....</p>}
        </div>
      </Col>
    </Row>
  );
}

export default StaffAdd;
