import React from "react";
import { Table, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import {
  useGetsersQuery,
  useDeleteSerMutation,
} from "../slices/serviceApiSlice";

function Tools() {
  const { data: plants, refetch, isLoading, error } = useGetsersQuery();

  const [deletePlant, { isLoading: loadingDelete }] = useDeleteSerMutation();

  const deleteHandler = async (id) => {
    try {
      await deletePlant(id);
      refetch();
    } catch (err) {
      window.alert(err?.data?.message || err.error);
    }
  };
  return (
    <Row>
      {" "}
      <Col md={12}>
        <h2 className="text-center my-4">
          <strong>Services</strong>
        </h2>
        <LinkContainer to="/dashboard/service/create">
          <Button variant="success">Add New Service</Button>
        </LinkContainer>
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
                <th>Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {plants.map((plant) => (
                <tr key={plant._id}>
                  <td>{plant._id}</td>
                  <td>{plant.name}</td>
                  <td>${plant.price}</td>

                  <td>
                    <>
                      <LinkContainer to={`/dashboard/service/${plant._id}`}>
                        <Button className="btn-sm mx-1" variant="warning">
                          Edit
                        </Button>
                      </LinkContainer>
                      <Button
                        className="btn-sm mx-1"
                        variant="danger"
                        onClick={() => deleteHandler(plant._id)}
                      >
                        Delete
                      </Button>
                      {loadingDelete && <p>Loading...</p>}
                    </>
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

export default Tools;
