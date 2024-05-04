import { useParams } from "react-router-dom";
import { Row, Col, ListGroup, Image, Button } from "react-bootstrap";
import Message from "../components/Message";
import { useGetOrderDetailsQuery } from "../slices/ordersApiSlice";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
function OrderScreen() {
  const { userInfo } = useSelector((state) => state.auth);
  const { id: orderId } = useParams();
  const { data: order, isLoading, error } = useGetOrderDetailsQuery(orderId);

  return isLoading ? (
    <p>Loading...</p>
  ) : error ? (
    <p>
      {error?.message?.data} || {error?.error}
    </p>
  ) : (
    <>
      <Row className="justify-content-md-center">
        <Col md={8}>
          {userInfo.role === "user" ? (
            <LinkContainer to="/myorders">
              <Button className="submit-button">Back</Button>
            </LinkContainer>
          ) : (
            <LinkContainer to="/dashboard/orders">
              <Button>Back</Button>
            </LinkContainer>
          )}
          <h1 className="mt-3">Order ID: {order._id}</h1>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>Order Items:</h3>
              <ListGroup variant="flush">
                {order.orderItems.map((item, index) => (
                  <ListGroup.Item key={index}>
                    <Row className="justify-content-md-center text-center">
                      <Col md={2}>
                        <Image
                          src={`http://localhost:5000${item.image}`}
                          alt={item.name}
                          fluid
                          rounded
                        />
                      </Col>
                      <Col>
                        <Row>
                          <Col md={2}>{item.name}</Col>
                          <Col md={2}>Qty: {item.qty}</Col>
                          <Col md={3}>${item.qty * item.price}</Col>
                        </Row>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>
                  Delivery Cost: <strong>${order.shippingPrice}</strong>
                </Col>

                <Col>
                  Tax Amount: <strong>${order.taxPrice}</strong>
                </Col>
                <Col>
                  Total Amount: <strong>${order.totalPrice}</strong>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <h3>Customer Details:</h3>
              <p>
                Name:{" "}
                <strong>
                  {order?.user.firstName} {order?.user.lastName}
                </strong>
              </p>

              {order.pickup && (
                <ListGroup.Item>
                  <h2>Pick Up time</h2>
                  <p>{order.pickup}</p>
                </ListGroup.Item>
              )}
              {order.shippingAddress && (
                <p>
                  Delivery Address:{" "}
                  <strong>
                    {order.shippingAddress.address},{" "}
                    {order.shippingAddress.city}, {order.shippingAddress.pin},{" "}
                    {order.shippingAddress.country}
                  </strong>
                </p>
              )}
            </ListGroup.Item>

            {userInfo.role !== "user" && order.servicePrice !== 0 && (
              <ListGroup.Item>
                <p>
                  <strong>Customer Needs Planting and Cleaning Services</strong>
                </p>
              </ListGroup.Item>
            )}

            <ListGroup.Item>
              <h3>Payment Info:</h3>
              <p>
                Method:
                <strong> {order.paymentMethod}</strong>
              </p>
              {order.isPaid ? (
                <Message variant="success">
                  Paid On: {new Date(order.paidAt).toLocaleDateString("en-US")}{" "}
                  {new Date(order.paidAt).toLocaleTimeString("en-US")}
                </Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h3>Delivery Info:</h3>
              {order.orderStatus === "delivered" ? (
                <Message variant="success">
                  Delivered on:{" "}
                  {new Date(order.deliveredAt).toLocaleDateString("en-US")}{" "}
                  {new Date(order.deliveredAt).toLocaleTimeString("en-US")}
                </Message>
              ) : (
                <Message>{order.orderStatus}. Yet to be Delivered.</Message>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
}

export default OrderScreen;
