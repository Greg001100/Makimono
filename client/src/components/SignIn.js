import React, { useState } from "react";
import { Form, Button, Col, Alert, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { removeAuth, signIn } from "../actions/authentication";
import { useHistory, Link } from "react-router-dom";
import DemoButton from "./DemoButton";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const valErrors = useSelector((state) => state.authentication.valErrors);
  const csurf_token = useSelector((state) => state.authentication.csurf);

  const handleSubmit = async (e) => {
    const csurf = csurf_token;
    e.preventDefault();
    await dispatch(removeAuth());
    const storeReady = await dispatch(signIn(email, password, csurf));
    if (storeReady) {
      console.log(storeReady);
      history.push(
        `/dashboard/${storeReady.latest_note[0]}/${storeReady.latest_note[1]}`
      );
    }
  };

  return (
    <Container>
      <Row>
        <Col></Col>
        <Col sm>
          {valErrors ? <Alert variant="danger">{valErrors.msg}</Alert> : null}
          <Form onSubmit={handleSubmit}>
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="signIn">
              Submit
            </Button>
            <DemoButton
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
            />
          </Form>
          <br></br>
          <Link to="/signup">Don't have an account?</Link>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}

export default SignIn;
