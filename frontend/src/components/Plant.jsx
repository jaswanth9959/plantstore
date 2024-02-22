import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
function Plant({ plant }) {
  return (
    <Card className="my-3 p-3 rounded text-center">
      <Link to={`/plant/${plant._id}`}>
        <Card.Img variant="top" src={plant.image} alt={plant.name} />
      </Link>
      <Card.Body>
        <Link to={`/plant/${plant._id}`}>
          <Card.Title as="div">
            <strong>{plant.name}</strong>
          </Card.Title>
        </Link>
        <Row>
          <Col>
            <Card.Text>
              Type: <strong>{plant.type}</strong>
            </Card.Text>
          </Col>
          <Col>
            <Card.Text>
              Price: <strong>${plant.price.toFixed(2)}</strong>
            </Card.Text>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default Plant;
