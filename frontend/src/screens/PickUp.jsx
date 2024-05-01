import React, { useState } from "react";
import { savePickup } from "../slices/cartSlice";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
function PickUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [val, setVal] = useState("");
  const clickHandler = () => {
    dispatch(savePickup({ val }));
    navigate("/payment");
  };
  return (
    <div className="justify-content-md-center">
      <h1>Choose Pick up time</h1>
      <Form.Control
        as="select"
        value={val}
        onChange={(e) => setVal(e.target.value)}
      >
        <option>Select</option>
        <option key={1} value="10:00AM">
          {"10:00AM"}
        </option>
        <option key={1} value="10:30AM">
          {"10:30AM"}
        </option>
        <option key={1} value="11:00AM">
          {"11:00AM"}
        </option>
        <option key={1} value="11:30AM">
          {"11:30AM"}
        </option>
      </Form.Control>
      <Button onClick={clickHandler} className="m-3">
        Continue
      </Button>
    </div>
  );
}

export default PickUp;
