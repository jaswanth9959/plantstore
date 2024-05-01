import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { FaTrash, FaArrowRight } from "react-icons/fa";
import Message from "../components/Message";
import { addTocart, removefromcart, clearcart } from "../slices/cartSlice";

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart1);
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems, taxPrice } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addTocart({ ...product, qty }));
  };

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  const removeFromCartHandler = (id) => {
    dispatch(removefromcart(id));
  };

  const clearcartHandler = () => {
    dispatch(clearcart());
  };

  const checkoutHandler = () => {
    if (userInfo.role === "user") {
      navigate("/login?redirect=/options");
    } else {
      navigate("/dashboard/customer");
    }
  };

  return (
    <Row>
      <Col md={8}>
        <h1 style={{ marginBottom: "20px" }}>Your CartItems</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item._id}>
                <Row>
                  <Col md={2}>
                    <Image
                      src={`http://localhost:5000${item.image}`}
                      alt={item.name}
                      fluid
                      rounded
                    />
                  </Col>
                  <Col md={3}>{item.name} </Col>
                  <Col md={2}>
                    ${item.price}{" "}
                    {item.addon && <span> + ${item.additionalPrice}</span>}
                  </Col>

                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        addToCartHandler(item, Number(e.target.value))
                      }
                    >
                      {[...Array(item.stock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Items Total:</Col>
                <Col>
                  {" "}
                  $
                  {addDecimals(
                    cartItems.reduce(
                      (acc, item) =>
                        acc +
                        (item.addon
                          ? ((item.price + item.additionalPrice) *
                              100 *
                              item.qty) /
                            100
                          : (item.price * 100 * item.qty) / 100),
                      0
                    )
                  )}
                </Col>
              </Row>
            </ListGroup.Item>
            {/* <ListGroup.Item>
              <Row>
                <Col>Shipping Amount:</Col>
                <Col>${shippingPrice}</Col>
              </Row>
            </ListGroup.Item> */}
            <ListGroup.Item>
              <Row>
                <Col>Tax Amount:</Col>
                <Col>${taxPrice}</Col>
              </Row>
            </ListGroup.Item>
            {/* <ListGroup.Item>
              <Row>
                <Col>Total Amount:</Col>
                <Col>${totalPrice}</Col>
              </Row>
            </ListGroup.Item> */}
            <ListGroup.Item>
              <Row>
                <Col>
                  <Button
                    type="button"
                    className="submit-button"
                    disabled={cartItems.length === 0}
                    onClick={clearcartHandler}
                  >
                    Clear Cart Items
                  </Button>
                </Col>
                <Col>
                  {" "}
                  <Button
                    type="button"
                    className="submit-button"
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                  >
                    Countinue <FaArrowRight />
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
