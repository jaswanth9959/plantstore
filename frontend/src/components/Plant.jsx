import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
function Plant({ plant }) {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <Card className="my-3 p-3 rounded text-center">
      {userInfo.role === "user" ? (
        <Link to={`/plant/${plant._id}`}>
          <Card.Img
            variant="top"
            src={`http://localhost:5000${plant.image}`}
            alt={plant.name}
          />
        </Link>
      ) : (
        <Link to={`/dashboard/counter/plant/${plant._id}`}>
          <Card.Img
            variant="top"
            src={`http://localhost:5000${plant.image}`}
            alt={plant.name}
          />
        </Link>
      )}

      <Card.Body>
        <Card.Title as="div">
          <strong>{plant.name}</strong>
        </Card.Title>

        <Row>
          <Col>
            <Card.Text>Type: {plant.type}</Card.Text>
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
