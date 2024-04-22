import React from "react";
import { Table, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useGetAllCategoriesQuery } from "../slices/categoryApiSlice";
function Categories() {
  const { data: categories, isLoading, error } = useGetAllCategoriesQuery();
  return (
    <Row>
      {" "}
      <Col md={12}>
        <h2 className="text-center my-4">
          <strong>Categories</strong>
        </h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error?.data?.message || error.error}</p>
        ) : (
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat._id}>
                  <td>{cat._id}</td>
                  <td>{cat.name}</td>
                  <td>
                    <LinkContainer to={`/dashboard/category/${cat._id}`}>
                      <Button className="btn-sm mx-1" variant="warning">
                        Edit
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
}

export default Categories;
