import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { saveShippingAddress, savePaymentMethod } from "../slices/cartSlice";

const AdressScreen = () => {
  const auth = useSelector((state) => state.auth);

  const [address, setAddress] = useState(auth.userInfo.address || "");
  const [city, setCity] = useState(auth.userInfo.city || "");
  const [pin, setPin] = useState(auth.userInfo.pin || "");
  const [country, setCountry] = useState(auth.userInfo.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (auth.userInfo.role === "user") {
      dispatch(saveShippingAddress({ address, city, pin, country }));
      navigate("/payment");
    } else {
      dispatch(saveShippingAddress({ address, city, pin, country }));
      navigate("/dashboard/payment");
    }
  };

  const skipHandler = () => {
    dispatch(savePaymentMethod());
    navigate("/dashboard/payment");
  };

  return (
    <Row className="justify-content-md-center mt-5">
      <Col md={6}>
        <div className="login-container">
          {" "}
          {/* Add className */}
          <h2 className="login-heading">Delivery Address</h2>{" "}
          {/* Add className */}
          <Form onSubmit={submitHandler}>
            <Form.Group className="my-2" controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter address"
                value={address}
                required
                onChange={(e) => setAddress(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter city"
                value={city}
                required
                onChange={(e) => setCity(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="postalCode">
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter postal code"
                value={pin}
                required
                onChange={(e) => setPin(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="country">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter country"
                value={country}
                required
                onChange={(e) => setCountry(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" className="submit-button">
              Continue <FaArrowRight />
            </Button>
          </Form>
        </div>
        {auth.userInfo.role !== "user" && (
          <Button onClick={skipHandler}>Skip</Button>
        )}
      </Col>
    </Row>
  );
};

export default AdressScreen;
