import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import {
  useCreateSerMutation,
  useUploadSerImageMutation,
} from "../slices/serviceApiSlice";
import { useSelector } from "react-redux";

function AddService() {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [createPlant, { isLoading: loadingUpdate }] = useCreateSerMutation();
  const [uploadPlantImage, { isLoading: loadingUpload }] =
    useUploadSerImageMutation();
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createPlant({
        userId: userInfo._id,
        name,
        image,
        description,
        price,
      }).unwrap();
      window.alert("created Successfully");
      navigate("/dashboard/services");
    } catch (err) {
      window.alert(err?.data?.message || err.error);
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadPlantImage(formData).unwrap();
      window.alert(res.message);
      setImage(res.image);
    } catch (err) {
      window.alert(err?.data?.message || err.error);
    }
  };
  return (
    <Row className="justify-content-md-center mt-5">
      <Col md={6}>
        <LinkContainer to="/dashboard/services">
          <Button variant="dark">Back</Button>
        </LinkContainer>

        <div className="login-container mt-3">
          {" "}
          {/* Add className */}
          <h2 className="login-heading">Service Addition Form</h2>{" "}
          {/* Add className */}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="formBasicEmail2" className="form-group">
              {" "}
              {/* Add className */}
              <Form.Label className="form-label">Name</Form.Label>{" "}
              {/* Add className */}
              <Form.Control
                type="text"
                placeholder="Enter  name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail1" className="form-group">
              {" "}
              {/* Add className */}
              <Form.Label className="form-label">Image</Form.Label>{" "}
              {/* Add className */}
              <Form.Control
                type="text"
                placeholder="Enter image url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.Control
                label="Choose File"
                onChange={uploadFileHandler}
                type="file"
              ></Form.Control>
              {loadingUpload && <p>Loading...</p>}
            </Form.Group>
            <Form.Group controlId="formBasicPhone" className="form-group">
              {" "}
              {/* Add className */}
              <Form.Label className="form-label">Price</Form.Label>{" "}
              {/* Add className */}
              <Form.Control
                type="number"
                placeholder="Enter Price of plant"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail" className="form-group">
              {" "}
              {/* Add className */}
              <Form.Label className="form-label">Description</Form.Label>{" "}
              {/* Add className */}
              <Form.Control
                type="text"
                placeholder="Enter Description of the plant"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Button type="submit" variant="dark">
              {" "}
              {/* Add className */}
              Add
            </Button>
          </Form>
          {loadingUpdate && <p>Loading....</p>}
        </div>
      </Col>
    </Row>
  );
}

export default AddService;
