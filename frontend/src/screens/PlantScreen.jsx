import { Link, useParams, useNavigate } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";
import { Row, Col, Image, ListGroup, Button, Form } from "react-bootstrap";
import { useState } from "react";
import { useGetPlantByIdQuery } from "../slices/plantsApiSlice";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addTocart } from "../slices/cartSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";
function PlantScreen() {
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  const { id } = useParams();
  const { userInfo } = useSelector((state) => state.auth);
  const { data: plant, isLoading, error } = useGetPlantByIdQuery(id);
  const [qty, setQty] = useState(1);
  const [custom, setCustom] = useState(0);
  const [includeFer, setIncludeFer] = useState(false);
  const [includePot, setIncludePot] = useState(false);
  const [includeService, setIncludeService] = useState(false);

  const [fer, setFer] = useState(0);
  const [pot, setPot] = useState(0);
  const [service, setService] = useState(0);
  const handleFer = (e) => {
    setIncludeFer(e.target.checked);

    if (!includeFer) {
      setFer(plant.fercost);
    } else {
      setFer(0);
    }
  };

  const handlePot = (e) => {
    setIncludePot(e.target.checked);

    if (!includePot) {
      setPot(5);
    } else {
      setPot(0);
    }
  };

  const handleArea = (e) => {
    e.preventDefault();
    setService(5 * custom);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const AddToCarthandler = () => {
    dispatch(addTocart({ ...plant, qty, custom, fer, pot, service }));
    if (userInfo.role === "user") {
      navigate("/cart");
    } else {
      navigate("/dashboard");
    }
  };

  useEffect(() => {
    if (includeService === false) {
      setService(0);
    }
  }, [includeService]);
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
                    <Col md={4}>Suggested Fertilizer:</Col>
                    <Col>
                      <strong>{plant.fertilizer} </strong>
                      <strong>cost: ${plant.fercost}</strong>
                    </Col>
                  </Row>
                  <Row>
                    {" "}
                    <Col md={4}></Col>
                    <Col>
                      <Form.Check
                        type="checkbox"
                        label="Include Fertilizer"
                        checked={includeFer}
                        onChange={(e) => handleFer(e)}
                      ></Form.Check>{" "}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col md={4}>Pot Cost:</Col>
                    <Col>
                      <strong>${5}</strong>
                    </Col>
                  </Row>
                  <Row>
                    {" "}
                    <Col md={4}></Col>
                    <Col>
                      <Form.Check
                        type="checkbox"
                        label="Include Pot"
                        checked={includePot}
                        onChange={(e) => handlePot(e)}
                      ></Form.Check>{" "}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      {" "}
                      <Form.Check
                        type="checkbox"
                        label="Include Service Planting and Cleaning Services( Cost: $5 per Sq Feet)"
                        checked={includeService}
                        onChange={(e) => setIncludeService(e.target.checked)}
                      ></Form.Check>{" "}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {includeService && (
                  <ListGroup.Item>
                    <Row>
                      <Col md={4}>Area of Land in Sq Feet</Col>
                      <Col>
                        <Form onSubmit={(e) => handleArea(e)}>
                          <Form.Control
                            type="number"
                            placeholder="Enter Area in Sq Feet"
                            value={custom}
                            onChange={(e) => setCustom(e.target.value)}
                            required
                          ></Form.Control>
                          <Button type="submit" className="m-2">
                            Save
                          </Button>
                        </Form>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Row>
                    <Col>
                      Effective price:{" "}
                      <strong>
                        $
                        {addDecimals(qty * (fer + service + pot + plant.price))}
                      </strong>
                    </Col>
                    <Col>
                      <Button
                        className=" btn btn-block"
                        type="button"
                        disabled={plant.stock === 0}
                        style={{ width: "280px" }}
                        onClick={AddToCarthandler}
                      >
                        <FaShoppingCart /> Add
                      </Button>
                    </Col>
                  </Row>
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
