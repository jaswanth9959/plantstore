import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import { clearcart } from "../slices/cartSlice";
import {
  useCreateOrderMutation,
  useCreateCounterOrderMutation,
} from "../slices/ordersApiSlice";
function PaymentScreen() {
  const [card, setCard] = useState("");
  const [code, setCode] = useState("");
  const [valid, setValid] = useState("");
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart1);
  const auth = useSelector((state) => state.auth);
  const { userInfo } = auth;
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();
  const [createCounterOrder, { isLoading: loadingCounter }] =
    useCreateCounterOrderMutation();
  const dispatch = useDispatch();
  const placeOrderHandler = async () => {
    if (card === "" || code === "" || valid === "") {
      return window.alert("All fields are required!");
    }
    if (userInfo.role === "user") {
      try {
        const res = await createOrder({
          cardNumber: card,
          status: true,
          token: userInfo.token,
          email_address: userInfo.email,
          orderItems: cart.cartItems,
          shippingAddress: cart?.shippingAddress,
          paymentMethod: "Card",
          itemsPrice: cart.itemsPrice,
          shippingPrice: cart.shippingPrice,
          taxPrice: cart.taxPrice,
          totalPrice: cart.totalPrice,
          pickup: cart?.pickup?.val,
          otype: cart?.shippingAddress ? "Delivery" : " pickup",
        }).unwrap();
        dispatch(clearcart());
        navigate(`/order/${res._id}`);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const res = await createCounterOrder({
          cardNumber: card,
          status: true,
          userDetails: cart.userDetails,
          email_address: userInfo.email,
          orderItems: cart.cartItems,
          shippingAddress: cart?.shippingAddress,
          paymentMethod: "Card",
          itemsPrice: cart.itemsPrice,
          shippingPrice: cart.shippingPrice,
          taxPrice: cart.taxPrice,
          totalPrice: cart.totalPrice,
        }).unwrap();
        dispatch(clearcart());
        navigate(`/dashboard/order/${res._id}`);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <Row className="justify-content-md-center">
        <Col md={10}>
          <ListGroup variant="flush" className="my-3">
            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <p>Your cart is empty</p>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row className="justify-content-md-center">
                        <Col md={2}>
                          <Image
                            src={`http://localhost:5000${item.image}`}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col md={6} className="text-center">
                          {item.name}
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = $
                          {Math.round(item.qty * (item.price * 100)) / 100}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>
                  Delivery Charge:{" "}
                  <strong>
                    ${cart.shippingAddress ? `${cart.shippingPrice}` : 0}
                  </strong>
                </Col>
                <Col>
                  Tax Amount: <strong>${cart.taxPrice}</strong>
                </Col>
                <Col>
                  Total Amount: <strong>${cart.totalPrice}</strong>
                </Col>
              </Row>
            </ListGroup.Item>
            {cart.pickup.val && (
              <ListGroup.Item>
                <h2>Pick Up time</h2>
                <p>{cart.pickup.val}</p>
              </ListGroup.Item>
            )}
            {cart.shippingAddress && (
              <ListGroup.Item>
                <h2>Delivery Address</h2>
                <p>
                  <strong>Address: </strong>
                  {cart.shippingAddress.address}, {cart.shippingAddress.city}{" "}
                  {cart.shippingAddress.postalCode},{" "}
                  {cart.shippingAddress.country}
                </p>
              </ListGroup.Item>
            )}

            <ListGroup.Item className="my-3">
              <h2>Payment Info</h2>
              <strong>Method: </strong>
              {"Card"}
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card>
            <ListGroup variant="flush">
              <Form>
                <ListGroup.Item>
                  <Form.Group controlId="formBasiccard" className="form-group">
                    <Form.Label className="form-label">Card Number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter 16 digit Card Number"
                      value={card}
                      onChange={(e) => setCard(e.target.value)}
                    />
                  </Form.Group>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Form.Group controlId="formBasicsec" className="form-group">
                    <Form.Label className="form-label">
                      Security Code
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter security code"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                    />
                  </Form.Group>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Form.Group controlId="formBasicvalid" className="form-group">
                    <Form.Label className="form-label">Valid Thru</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="mm/yyyy"
                      value={valid}
                      onChange={(e) => setValid(e.target.value)}
                    />
                  </Form.Group>
                </ListGroup.Item>
              </Form>

              {error && (
                <>
                  <ListGroup.Item>
                    <p>{error.data.message}</p>
                  </ListGroup.Item>
                </>
              )}
              <ListGroup.Item>
                <Button
                  type="button"
                  className="submit-button"
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Pay ${cart.totalPrice}
                </Button>
                {isLoading && <p>Loading...</p>}
                {loadingCounter && <p>Loading...</p>}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default PaymentScreen;
