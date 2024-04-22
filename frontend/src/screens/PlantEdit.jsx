import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import {
  useGetPlantByIdQuery,
  useUpdatePlantMutation,
  useUploadPlantImageMutation,
} from "../slices/plantsApiSlice";
import { useGetAllCategoriesQuery } from "../slices/categoryApiSlice";

function PlantEdit() {
  const { id: plantId } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [additionalCost, setAdditionalCost] = useState(0);
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState("");
  const { data: types } = useGetAllCategoriesQuery();
  const { data: plant, isLoading, error } = useGetPlantByIdQuery(plantId);
  const [updatePlant, { isLoading: loadingUpdate }] = useUpdatePlantMutation();
  const [uploadPlantImage, { isLoading: loadingUpload }] =
    useUploadPlantImageMutation();
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updatePlant({
        plantId,
        name,
        category,
        image,
        description,
        type,
        price,
        stock,
        additionalCost,
      }).unwrap();
      window.alert("Update Successful");
    } catch (err) {
      window.alert(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (plant) {
      setName(plant.name);
      setImage(plant.image);
      setDescription(plant.description);
      setStock(plant.stock);
      setPrice(plant.price);
      setCategory(plant.category);
      setType(plant.type);
      setAdditionalCost(plant.additionalCost);
    }
  }, [plant]);

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
        <LinkContainer to="/dashboard/plants">
          <Button variant="dark">Back</Button>
        </LinkContainer>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error?.data?.message || error.error}</p>
        ) : (
          <div className="login-container mt-3">
            {" "}
            {/* Add className */}
            <h2 className="login-heading">Plant Edit Form</h2>{" "}
            {/* Add className */}
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="formBasicEmail2" className="form-group">
                {" "}
                {/* Add className */}
                <Form.Label className="form-label">Name</Form.Label>{" "}
                {/* Add className */}
                <Form.Control
                  type="text"
                  placeholder="Enter plant name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail21" className="form-group">
                {" "}
                {/* Add className */}
                <Form.Label className="form-label">Type</Form.Label>{" "}
                {/* Add className */}
                <Form.Control
                  type="text"
                  placeholder="Enter plant type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
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
              <Form.Group controlId="formBasicPhone1" className="form-group">
                {" "}
                {/* Add className */}
                <Form.Label className="form-label">
                  Additionl service Price
                </Form.Label>{" "}
                {/* Add className */}
                <Form.Control
                  type="number"
                  placeholder="Enter Price "
                  value={additionalCost}
                  onChange={(e) => setAdditionalCost(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail" className="form-group">
                {" "}
                {/* Add className */}
                <Form.Label className="form-label">Description</Form.Label>{" "}
                {/* Add className */}
                <Form.Control
                  type="text"
                  placeholder="Enter Description of the Room"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail6" className="form-group">
                {" "}
                {/* Add className */}
                <Form.Label className="form-label">Stock</Form.Label>{" "}
                {/* Add className */}
                <Form.Control
                  type="text"
                  placeholder="Enter stock"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail9" className="form-group">
                {" "}
                {/* Add className */}
                <Form.Label className="form-label">Category</Form.Label>{" "}
                {/* Add className */}
                <Form.Control
                  as="select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {types?.map((x) => (
                    <option key={x._id} value={x._id}>
                      {x.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Button type="submit" variant="dark">
                {" "}
                {/* Add className */}
                Update
              </Button>
            </Form>
            {loadingUpdate && <p>Loading....</p>}
          </div>
        )}
      </Col>
    </Row>
  );
}

export default PlantEdit;
