import { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useProfileMutation } from "../slices/usersApiSlice";
// import { useGetMyOrdersQuery } from "../slices/ordersApiSlice";
import { setCredentials } from "../slices/authSlice";

function Profile() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pin, setPin] = useState("");
  const [country, setCountry] = useState("");

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();
  //const { data: orders, isLoading, error } = useGetMyOrdersQuery(userInfo._id);

  useEffect(() => {
    setFirstName(userInfo.firstName);
    setLastName(userInfo.lastName);
    setEmail(userInfo.email);
    setAddress(userInfo.address);
    setCity(userInfo.city);
    setPin(userInfo.pin);
    setCountry(userInfo.country);
  }, [
    userInfo.email,
    userInfo.firstName,
    userInfo.lastName,
    userInfo.address,
    userInfo.city,
    userInfo.pin,
    userInfo.country,
  ]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      window.alert("Passwords do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          token: userInfo.token,
          firstName,
          lastName,
          email,
          password,
          address,
          city,
          pin,
          country,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        window.alert("Profile updated successfully");
      } catch (err) {
        window.alert(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <Row className="justify-content-md-center mt-5">
        <Col md={6}>
          <div className="login-container">
            {" "}
            {/* Add className */}
            <h2 className="login-heading">Update Profile</h2>{" "}
            {/* Add className */}
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="formBasicFN" className="form-group">
                {" "}
                {/* Add className */}
                <Form.Label className="form-label">First Name</Form.Label>{" "}
                {/* Add className */}
                <Form.Control
                  type="text"
                  placeholder="Enter First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicLN" className="form-group">
                {" "}
                {/* Add className */}
                <Form.Label className="form-label">Last Name</Form.Label>{" "}
                {/* Add className */}
                <Form.Control
                  type="text"
                  placeholder="Enter Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail" className="form-group">
                {" "}
                {/* Add className */}
                <Form.Label className="form-label">
                  Email address
                </Form.Label>{" "}
                {/* Add className */}
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicaddress" className="form-group">
                <Form.Label className="form-label">Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formBasiccity" className="form-group">
                <Form.Label className="form-label">City</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formBasicpin" className="form-group">
                <Form.Label className="form-label">Pin</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Pin"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formBasiccountry" className="form-group">
                <Form.Label className="form-label">Country</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword" className="form-group">
                {" "}
                {/* Add className */}
                <Form.Label className="form-label">Password</Form.Label>{" "}
                {/* Add className */}
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                controlId="formBasicConfirmPassword"
                className="form-group"
              >
                <Form.Label className="form-label">ReEnter-Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>
              <Button type="submit" className="submit-button">
                {" "}
                {/* Add className */}
                Update
              </Button>
            </Form>
            {loadingUpdateProfile && <p>Loading....</p>}
          </div>
        </Col>
      </Row>
      {/* <Row>
        <Col md={3}>
          <h2>User Profile</h2>

          <Form onSubmit={submitHandler}>
            <Form.Group className="my-2" controlId="firstname">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter First name"
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="my-2" controlId="lastname">
              <Form.Label>last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Last name"
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="my-2" controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="light">
              Update
            </Button>
            {loadingUpdateProfile && <p>Loading..</p>}
          </Form>
        </Col>
        <Col md={9}>
          <h2>My Orders</h2>
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error?.data?.message || error.error}</p>
          ) : (
            <Table striped hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>ORDER ID</th>
                  <th>DATE</th>
                  <th>AMOUNT</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <FaTimes style={{ color: "red" }} />
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <FaTimes style={{ color: "red" }} />
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button className="btn-sm" variant="light">
                          Details
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row> */}
    </>
  );
}

export default Profile;
