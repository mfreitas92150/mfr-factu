import React from "react";
import { Button, Container, Navbar, Nav, Form } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Appbar = () => {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="mb-3">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>MFR Factu</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto"></Nav>
          <Form inline>
            <Button variant="light" onClick={() => {}}>
              Bla
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Appbar;
