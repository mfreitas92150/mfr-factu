import React, { useState, useEffect } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import * as API from "../utils/API";
import { useHistory } from "react-router-dom";

export default function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
  }, [email, password]);

  const errorAlert = error ? <span>{error}</span> : null;
  if (API.isAuth()) {
    history.push("/");
    return null;
  }
  return (
    <div className="Login">
      <Container>
        <Row>
          <Col>
            <h2>Authentification</h2>
          </Col>
        </Row>
        <Row>
          <Col>{errorAlert}</Col>
        </Row>
        <Form
          onSubmit={async (e: any) => {
            e.preventDefault();
            try {
              await API.login(email, password);
            } catch (err) {
              console.info(error);
              setError("Compte inconnu ou mot de passe erroné !");
            }
          }}
          onReset={() => {
            history.push("/signup");
          }}
        >
          <Row>
            <Col>
              <Form.Group as={Row} controlId="formPlaintextEmail">
                <Form.Label column sm="2">
                  Email
                </Form.Label>
                <Col sm="3">
                  <Form.Control
                    type="text"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formPlaintextPassword">
                <Form.Label column sm="2">
                  Password
                </Form.Label>
                <Col sm="3">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </Col>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={{ span: 2, offset: 1 }}>
              <Button variant="primary" type="submit">
                Login
              </Button>
            </Col>
            <Col sm="2">
              <Button variant="light" type="reset">
                Sign-up
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
}
