import { Link, useParams } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";
import {
  Row,
  Col,
  Image,
  Card,
  ListGroup,
  Button,
  Form,
} from "react-bootstrap";
import plants from "../plants";
import { useState } from "react";

function PlantScreen() {
  const { id } = useParams();
  const plant = plants.find((plant) => plant._id === Number(id));
  const [qty, setQty] = useState(0);
  return (
    <>
      <Link to="/">
        <MdArrowBackIos /> BACK
      </Link>
      <Row className="py-3">
        <Col md={6}>
          <Image
            src={plant.image}
            alt={plant.name}
            fluid
            style={{ borderRadius: "10px", width: "500px", height: "500px" }}
          />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{plant.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>Price: ${plant.price}</ListGroup.Item>
            <ListGroup.Item>Description: {plant.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${plant.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>{plant.stock > 0 ? "In Stock" : "Out Of Stock"}</Col>
                </Row>
              </ListGroup.Item>

              {/* Qty Select */}
              {plant.stock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Qty</Col>
                    <Col>
                      <Form.Control
                        as="select"
                        value={qty}
                        onChange={(e) => setQty(Number(e.target.value))}
                      >
                        {[...Array(plant.stock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                <Button
                  className="btn-block"
                  type="button"
                  disabled={plant.stock === 0}
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default PlantScreen;
