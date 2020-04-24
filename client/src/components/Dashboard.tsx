import React from "react";
import * as API from "../utils/API";
import {
  Row,
  Col,
  Button,
  Container,
  Navbar,
  Nav,
  Form,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";

export default function Dashboard() {
  const history = useHistory();
  return (
    <>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">MFR Factu</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto"></Nav>
            <Form inline>
              <Button
                variant="light"
                onClick={() => {
                  API.logout();
                  history.push("/");
                }}
              >
                Déconnexion
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <Row>
          <Col>Dashboard</Col>
        </Row>
      </Container>
    </>
  );
}
