import { useGetPlantsQuery } from "../slices/plantsApiSlice";
import { Row, Col } from "react-bootstrap";
import Plant from "../components/Plant";

const Home = () => {
  const { data: plants, isLoading, error } = useGetPlantsQuery();
  return (
    <>
      {isLoading ? (
        <h1>.....</h1>
      ) : error ? (
        <h2>{error?.data?.message || error?.error}</h2>
      ) : (
        <>
          <h1 className="text-center">All Plants</h1>
          <Row>
            {plants.map((plant) => (
              <Col key={plant._id} xs={6} md={4} lg={3} className="mb-4">
                <Plant plant={plant} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default Home;
