import { useGetPlantsQuery } from "../slices/plantsApiSlice";
import { useGetfersQuery } from "../slices/ferApiSlice";
import { useGetsersQuery } from "../slices/serviceApiSlice";
import { Row, Col } from "react-bootstrap";
import Plant from "../components/Plant";
import Fertilizer from "../components/Fertilizer";
import Service from "../components/Service";

const Home = () => {
  const { data: plants, isLoading, error } = useGetPlantsQuery();
  const { data: fers } = useGetfersQuery();
  const { data: sers } = useGetsersQuery();
  return (
    <>
      {isLoading ? (
        <h1>.....</h1>
      ) : error ? (
        <h2>{error?.data?.message || error?.error}</h2>
      ) : (
        <Row>
          <Col md={4}>
            <h1 className="text-center">All Plants</h1>
            <Row>
              {plants.map((plant) => (
                <Col key={plant._id} xs={12} md={12} lg={12} className="mb-4">
                  <Plant plant={plant} />
                </Col>
              ))}
            </Row>
          </Col>
          <Col md={4}>
            <h1 className="text-center">Pots And Fertilizers</h1>
            <Row>
              {fers?.map((plant) => (
                <Col key={plant._id} xs={12} md={12} lg={12} className="mb-4">
                  <Fertilizer plant={plant} />
                </Col>
              ))}
            </Row>
          </Col>
          <Col md={4}>
            <h1 className="text-center">All Services</h1>
            <Row>
              {sers?.map((plant) => (
                <Col key={plant._id} xs={12} md={12} lg={12} className="mb-4">
                  <Service plant={plant} />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      )}
    </>
  );
};

export default Home;
