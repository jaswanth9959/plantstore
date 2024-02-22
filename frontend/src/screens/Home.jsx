import plants from "../plants";
import { Row, Col } from "react-bootstrap";
import Plant from "../components/Plant";

const Home = () => {
  return (
    <>
      <h1 className="text-center">All Plants</h1>
      <Row>
        {plants.map((plant) => (
          <Col key={plant._id} xs={12} md={6} lg={4} className="mb-4">
            <Plant plant={plant} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Home;
