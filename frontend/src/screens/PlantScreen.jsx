import { Link, useParams, useNavigate } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";
import { Row, Col, Image, ListGroup, Button, Form } from "react-bootstrap";
import { useState } from "react";
import { useGetPlantByIdQuery } from "../slices/plantsApiSlice";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addTocart } from "../slices/cartSlice";
import { useSelector } from "react-redux";
function PlantScreen() {
  const { id } = useParams();
  const { userInfo } = useSelector((state) => state.auth);
  const { data: plant, isLoading, error } = useGetPlantByIdQuery(id);

  const [qty, setQty] = useState(1);
  const [custom, setCustom] = useState("");
  const [addon, setAddon] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const AddToCarthandler = () => {
    dispatch(addTocart({ ...plant, qty, custom, addon }));
    if (userInfo.role === "user") {
      navigate("/cart");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <>
      <Link to="/">
        <MdArrowBackIos /> BACK
      </Link>
      {isLoading ? (
        <h2>.....yo</h2>
      ) : error ? (
        <h2>{error?.message?.data || error?.error}</h2>
      ) : (
        <>
          <Row className="py-3">
            <Col md={6}>
              <Image
                src={`http://localhost:5000${plant.image}`}
                alt={plant.name}
                fluid
                style={{
                  borderRadius: "10px",
                  width: "500px",
                  height: "500px",
                }}
              />
            </Col>
            <Col md={6}>
              <ListGroup>
                <ListGroup.Item>
                  <Row>
                    <Col md={4}>
                      <h3>Name:</h3>
                    </Col>
                    <Col>
                      <h3>{plant.name}</h3>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col md={4}>Description:</Col>
                    <Col>{plant.description}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col md={4}> Type:</Col>
                    <Col> {plant.type}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col md={4}>Category:</Col>
                    <Col>{plant.category?.name}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col md={4}>Price:</Col>
                    <Col>
                      <strong>${plant.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col md={4}>Status:</Col>
                    <Col>{plant.stock > 0 ? "In Stock" : "Out Of Stock"}</Col>
                  </Row>
                </ListGroup.Item>

                {/* Qty Select */}
                {plant.stock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col md={4}>Qty</Col>
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
                  <Row>
                    <Col md={4}>Customization</Col>
                    <Col>
                      <Form.Control
                        type="text"
                        placeholder="Customize your plant. let us know how you want it."
                        value={custom}
                        required
                        onChange={(e) => setCustom(e.target.value)}
                      ></Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col md={4}>Include addtional Service</Col>
                    <Col>
                      <Form.Check
                        type="checkbox"
                        label="Include"
                        checked={addon}
                        onChange={(e) => setAddon(e.target.checked)}
                      ></Form.Check>
                      <p>
                        Note: This service is a pack of fertilizer and tools
                        need for gardening the plant which costs{" "}
                        <strong>${plant.additionalPrice}</strong>{" "}
                      </p>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-end">
                  <Button
                    className=" btn btn-block"
                    type="button"
                    disabled={plant.stock === 0}
                    style={{ width: "280px" }}
                    onClick={AddToCarthandler}
                  >
                    <FaShoppingCart /> Add
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
}

export default PlantScreen;
