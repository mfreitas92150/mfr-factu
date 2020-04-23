import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import API from "../../utils/API";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
  }, [email, password]);

  const errorAlert = error ? <span>{error}</span> : null;
  if (API.isAuth()) {
    window.location = "/";
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
          onSubmit={(e) => {
            e.preventDefault();
            axios
              .post(
                `http://localhost:8800/user/login`,
                {
                  email,
                  password,
                },
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              )
              .then((response) => {
                localStorage.setItem("token", response.data.token);
                window.location = "/";
              })
              .catch((error) => {
                console.info(error);
                setError("Compte inconnu ou mot de passe erroné !");
              });
          }}
          onReset={() => {
            window.location = "/signup";
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
