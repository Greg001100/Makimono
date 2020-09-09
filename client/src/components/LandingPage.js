import React from "react";
import { Link } from "react-router-dom";
import {Button, Container, Col, Row} from 'react-bootstrap'

function LandingPage() {

  return (
    <Container>
      <Row className="text-center justify-content-center">
          <h1>Makimono</h1>
      </Row>
      <Row className="text-center justify-content-center">
        <Col></Col>
        <Col><p>Organize your thoughts.</p></Col>
        <Col></Col>
      </Row>
      <Row className="justify-content-center">
          <nav className="d-flex justify-content-center">
            <Link to='signup'><Button className="mx-3">Sign up</Button></Link>
            <Link to='/signin'><Button>Login</Button></Link>
          </nav>
      </Row>
    </Container>

  );
}

export default LandingPage;
