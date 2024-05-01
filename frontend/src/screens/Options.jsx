import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
function Options() {
  const navigate = useNavigate();

  const deliveryHandler = () => {
    navigate("/shipping");
  };
  const pickupHandler = () => {
    navigate("/pickup");
  };
  return (
    <div className="justify-content-md-center">
      <h1>Choose Method</h1>
      <Button onClick={deliveryHandler} className="m-3">
        Delivery
      </Button>
      <Button onClick={pickupHandler} className="m-3">
        Pick Up
      </Button>
    </div>
  );
}

export default Options;
