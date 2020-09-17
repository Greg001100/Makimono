import React, { useState } from "react";
import { Form, Button, Col, Alert, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { removeAuth, signUp } from "../actions/authentication";
import { useHistory, Link } from "react-router-dom";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const valErrors = useSelector((state) => state.authentication.valErrors);
  const csurf_token = useSelector((state) => state.authentication.csurf)

  const handleSubmit = async (e) => {
    const csurf = csurf_token
    e.preventDefault();
    await dispatch(removeAuth());
    const storeReady = await dispatch(
      signUp(firstName, lastName, email, password, csurf)
    );
    if (storeReady) {
      history.push(`/dashboard/${storeReady.latest_note[0]}/${storeReady.latest_note[1]}`);
    }
  };

  return (
    <Container>
      <Row>
        <Col></Col>
        <Col sm>
        {valErrors? <Alert variant="danger">{valErrors.msg}</Alert> : null}
          <Form onSubmit={handleSubmit}>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  required
                />
              </Form.Group>
            </Form.Row>

            <Form.Group controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {password.length < 8 && password.length > 0 ? (
                <p className="signup_password_disclaimer">
                  *Must be at least 8 characters, have one number and
                  one capital
                </p>
              ) : null}
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          <br></br>
          <Link to="/signin">Already have an account?</Link>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}

export default SignUp;
