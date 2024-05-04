import { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useStaffprofileMutation } from "../slices/staffApiSlice";
import { setCredentials } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
function StaffProfile() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [ssn, setSsn] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useStaffprofileMutation();

  useEffect(() => {
    setFirstName(userInfo.firstName);
    setLastName(userInfo.lastName);
    setEmail(userInfo.email);
    setSsn(userInfo.ssn);
    setAddress(userInfo.address);
    setPhone(userInfo.phone);
    setDob(userInfo.dob);
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      window.alert("Passwords do not match");
    } else {
      try {
        const res = await updateProfile({
          staffId: userInfo._id,
          token: userInfo.token,
          firstName,
          lastName,
          email,
          password,
          ssn,
          dob,
          address,
          phone,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        window.alert(" Staff Profile updated successfully");
        navigate("/dashboard");
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
            <h2 className="login-heading">
              {userInfo.first ? "please update password" : "Update Profile"}
            </h2>{" "}
            {/* Add className */}
            <Form onSubmit={submitHandler}>
              {userInfo.first ? (
                <>
                  {" "}
                  <Form.Group
                    controlId="formBasicPassword"
                    className="form-group"
                  >
                    {" "}
                    {/* Add className */}
                    <Form.Label className="form-label">
                      Password
                    </Form.Label>{" "}
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
                    <Form.Label className="form-label">
                      ReEnter-Password
                    </Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </Form.Group>
                </>
              ) : (
                <>
                  <Form.Group controlId="formBasicFN" className="form-group">
                    {" "}
                    {/* Add className */}
                    <Form.Label className="form-label">
                      First Name
                    </Form.Label>{" "}
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
                    <Form.Label className="form-label">
                      Last Name
                    </Form.Label>{" "}
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

                  <Form.Group
                    controlId="formBasicaddress"
                    className="form-group"
                  >
                    <Form.Label className="form-label">SSn</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter SSN"
                      value={ssn}
                      onChange={(e) => setSsn(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicS" className="form-group">
                    {" "}
                    {/* Add className */}
                    <Form.Label className="form-label">DOB</Form.Label>{" "}
                    {/* Add className */}
                    <Form.Control
                      type="text"
                      placeholder="Enter Date Of Birth"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="dkdkdkdkd" className="form-group">
                    {" "}
                    {/* Add className */}
                    <Form.Label className="form-label">Phone</Form.Label>{" "}
                    {/* Add className */}
                    <Form.Control
                      type="text"
                      placeholder="Enter Phone Number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group
                    controlId="formBasicSSn122"
                    className="form-group"
                  >
                    {" "}
                    {/* Add className */}
                    <Form.Label className="form-label">Address</Form.Label>{" "}
                    {/* Add className */}
                    <Form.Control
                      type="text"
                      placeholder="Enter Address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group
                    controlId="formBasicPassword"
                    className="form-group"
                  >
                    {" "}
                    {/* Add className */}
                    <Form.Label className="form-label">
                      Password
                    </Form.Label>{" "}
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
                    <Form.Label className="form-label">
                      ReEnter-Password
                    </Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </Form.Group>
                </>
              )}

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
    </>
  );
}

export default StaffProfile;
