import React from "react";
import { Table, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  useGetOrdersQuery,
  useUpdateOrderMutation,
} from "../slices/ordersApiSlice";

function Orders() {
  const { data: orders, refetch, isLoading, error } = useGetOrdersQuery();
  const [updateOrder, { isLoading: loadingUpdate }] = useUpdateOrderMutation();

  const statusHandler = async (id) => {
    await updateOrder(id);
    window.alert("Status updated");
    refetch();
  };
  return (
    <Row>
      {" "}
      <Col md={12}>
        <h2 className="text-center my-4">
          <strong>Orders</strong>
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
                <th>Customer</th>
                <th>Received Date</th>
                <th>Type</th>
                <th>Total</th>
                <th>Status</th>
                <th>Paid On</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>
                    <Link to={`/dashboard/order/${order._id}`}>
                      {order._id}
                    </Link>
                  </td>
                  <td>
                    {order?.user?.firstName} {order?.user?.lastName}
                  </td>
                  <td>{order?.createdAt.substring(0, 10)}</td>
                  <td>{order.orderType}</td>
                  <td>${order.totalPrice}</td>

                  <td>
                    {/* <Badge
                      bg={`${
                        reservation.reservationStatus === "Yet to Process"
                          ? "primary"
                          : reservation.reservationStatus === "Ready"
                          ? "warning"
                          : "success"
                      }`}
                    >
                      {reservation.reservationStatus}
                    </Badge> */}
                    {order.orderStatus}
                  </td>
                  <td>
                    {order.isPaid ? (
                      order?.paidAt?.substring(0, 10)
                    ) : (
                      <p style={{ color: "red" }}> NO</p>
                    )}
                  </td>

                  <td>
                    <>
                      {order.orderStatus === "Order Received" && (
                        <Button
                          className="btn-sm mx-1"
                          onClick={() => statusHandler(order._id)}
                        >
                          {" "}
                          Ready
                        </Button>
                      )}
                      {order.orderStatus === "Ready" && (
                        <Button
                          className="btn-sm mx-1"
                          onClick={() => statusHandler(order._id)}
                        >
                          Delivered
                        </Button>
                      )}
                    </>
                  </td>
                </tr>
              ))}
            </tbody>
            {loadingUpdate && <p>Loading...</p>}
          </Table>
        )}
      </Col>
    </Row>
  );
}

export default Orders;
