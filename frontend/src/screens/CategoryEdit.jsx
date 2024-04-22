import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import {
  useGetCategoryQuery,
  useUpdateCategoryMutation,
} from "../slices/categoryApiSlice";
import { LinkContainer } from "react-router-bootstrap";

function CategoryEdit() {
  const { id: catId } = useParams();
  const [name, setName] = useState("");

  const { data: category, isLoading, error } = useGetCategoryQuery(catId);
  const [updateCategory, { isLoading: loadingUpdate }] =
    useUpdateCategoryMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateCategory({
        catId,
        name,
      }).unwrap();
      window.alert("category Update Successful!");
    } catch (err) {
      window.alert(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (category) {
      setName(category.name);
    }
  }, [category]);
  return (
    <Row className="justify-content-md-center mt-5">
      <Col md={6}>
        <LinkContainer to="/dashboard/categories">
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
            <h2 className="login-heading">Category Edit Form</h2>{" "}
            {/* Add className */}
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="formBasicEmail2" className="form-group">
                {" "}
                {/* Add className */}
                <Form.Label className="form-label">Name</Form.Label>{" "}
                {/* Add className */}
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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

export default CategoryEdit;
