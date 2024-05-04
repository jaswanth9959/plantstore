import { Card, Col, Row, Form } from "react-bootstrap";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addTocart } from "../slices/cartSlice";
function Service({ plant }) {
  const { userInfo } = useSelector((state) => state.auth);
  const [qty, setQty] = useState("");
  const dispatch = useDispatch();
  const addToCartHandler = (item) => {
    dispatch(addTocart({ ...item, qty }));
    window.alert("Service is added to cart!");
  };
  return (
    <Card className="my-3 p-3 rounded text-center">
      {userInfo.role === "user" ? (
        <Card.Img
          variant="top"
          src={`http://localhost:5000${plant.image}`}
          alt={plant.name}
        />
      ) : (
        <Card.Img
          variant="top"
          src={`http://localhost:5000${plant.image}`}
          alt={plant.name}
        />
      )}

      <Card.Body>
        <Card.Title as="div">
          <strong>{plant.name}</strong>
        </Card.Title>

        <Row>
          <Col>
            <Card.Text>
              Price: <strong>${plant.price.toFixed(2)} per Sq Feet</strong>
            </Card.Text>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="my-2" controlId="address">
              <Form.Label>Area</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Area in Sq Feet"
                value={qty}
                required
                onChange={(e) => setQty(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          {" "}
          <button
            style={{ width: "100%" }}
            onClick={() => addToCartHandler(plant)}
          >
            Add To Cart
          </button>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default Service;
