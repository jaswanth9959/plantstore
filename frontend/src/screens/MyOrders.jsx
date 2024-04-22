import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetMyOrdersQuery } from "../slices/ordersApiSlice";
import { ListGroup, Row, Col, Badge, Button } from "react-bootstrap";
function MyOrders() {
  const { userInfo } = useSelector((state) => state.auth);

  const { data: orders, isLoading, error } = useGetMyOrdersQuery(userInfo._id);
  console.log(orders);
  return (
    <Row className="justify-content-md-center text-center">
      <Col md={10}>
        <h2>My Orders</h2>
        <Row className=" py-2">
          <Col>
            <strong>Order ID</strong>
          </Col>
          <Col>
            <strong>Order Total</strong>
          </Col>
          <Col>
            <strong>Payment Status</strong>
          </Col>
          <Col>
            <strong>Order Status</strong>
          </Col>
          <Col></Col>
        </Row>

        <ListGroup variant="flust">
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p></p>
          ) : (
            <>
              {orders.map((order) => (
                <ListGroup.Item key={order._id}>
                  <Row>
                    <Col>{order._id}</Col>
                    <Col>${order.totalPrice}</Col>
                    <Col>
                      {order.isPaid ? (
                        <Badge bg="success">Paid</Badge>
                      ) : (
                        <Badge bg="danger">Not Paid</Badge>
                      )}
                    </Col>
                    <Col>{order.orderStatus}</Col>
                    <Col>
                      <Link to={`/order/${order._id}`}>
                        <Button className="submit-button">View Order</Button>
                      </Link>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </>
          )}
        </ListGroup>
      </Col>
    </Row>
  );
}

export default MyOrders;
