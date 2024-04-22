import React from "react";
import { Table, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import {
  useGetStaffQuery,
  useDeleteStaffMutation,
} from "../slices/staffApiSlice";

function Staff() {
  const { data: users, refetch, isLoading, error } = useGetStaffQuery();

  const [deleteStaff, { isLoading: loadingDelete }] = useDeleteStaffMutation();

  const deleteHandler = async (id) => {
    try {
      await deleteStaff(id);
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
          <strong>Staff</strong>
        </h2>
        <LinkContainer to="/dashboard/staff/create">
          <Button variant="success">Create Staff Account</Button>
        </LinkContainer>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error?.data?.message || error.error}</p>
        ) : (
          <Table className="mt-3">
            <thead>
              <tr>
                <th>Staff ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>SSN</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>
                    {user?.firstName} {user?.lastName}
                  </td>
                  <td>{user.email}</td>
                  <td>{user.ssn}</td>
                  <td>{user.role}</td>
                  <td>
                    <>
                      <LinkContainer to={`/dashboard/staff/${user._id}`}>
                        <Button className="btn-sm mx-1" variant="warning">
                          Edit
                        </Button>
                      </LinkContainer>
                      <Button
                        className="btn-sm mx-1"
                        variant="danger"
                        onClick={() => deleteHandler(user._id)}
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

export default Staff;
