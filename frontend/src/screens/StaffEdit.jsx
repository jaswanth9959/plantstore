import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import {
  useGetStaffByIDQuery,
  useUpdateStaffMutation,
} from "../slices/staffApiSlice";
import { LinkContainer } from "react-router-bootstrap";

function StaffEdit() {
  const { id: staffId } = useParams();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [ssn, setSsn] = useState("");

  const { data: staff, isLoading, error } = useGetStaffByIDQuery(staffId);
  const [updateStaff, { isLoading: loadingUpdate }] = useUpdateStaffMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateStaff({
        staffId,
        firstName,
        lastName,
        email,
        ssn,
      }).unwrap();
      window.alert("Staff Update Successful!");
    } catch (err) {
      window.alert(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (staff) {
      setFirstName(staff.firstName);
      setLastName(staff.lastName);
      setEmail(staff.email);
      setSsn(staff.ssn);
    }
  }, [staff]);
  return (
    <Row className="justify-content-md-center mt-5">
      <Col md={6}>
        <LinkContainer to="/dashboard/staff">
          <Button variant="dark"> Back</Button>
        </LinkContainer>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error?.data?.message || error.error}</p>
        ) : (
          <div className="login-container mt-3">
            {" "}
            {/* Add className */}
            <h2 className="login-heading">Staff Edit Form</h2>{" "}
            {/* Add className */}
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="formBasicEmail2" className="form-group">
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

              <Form.Group controlId="formBasicEmail1" className="form-group">
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
                <Form.Label className="form-label">
                  Email address
                </Form.Label>{" "}
                {/* Add className */}
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail6" className="form-group">
                {" "}
                {/* Add className */}
                <Form.Label className="form-label">SSn</Form.Label>{" "}
                {/* Add className */}
                <Form.Control
                  type="text"
                  placeholder="Enter Last Name"
                  value={ssn}
                  onChange={(e) => setSsn(e.target.value)}
                />
              </Form.Group>

              <Button type="submit" variant="dark">
                {" "}
                {/* Add className */}
                Update
              </Button>
            </Form>
            {loadingUpdate && <p>Loading....</p>}
          </div>
        )}
      </Col>
    </Row>
  );
}

export default StaffEdit;
