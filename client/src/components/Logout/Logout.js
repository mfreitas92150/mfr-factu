import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import API from "../../utils/API";

export default function Logout() {
  if (!API.isAuth()) {
    window.location = "/login";
    return null;
  }

  return (
    <div className="Logout">
      <Container>
        <Row>
          <Col>
            <h2>Déconnexion</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              variant="light"
              onClick={() => {
                localStorage.removeItem("token");
                window.location = "/";
              }}
            >
              Déconnexion
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
