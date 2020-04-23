import React, { useState, useEffect } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import axios from "axios";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
  }, [email, password]);

  const errorAlert = error ? <span>{error}</span> : null;

  return (
    <div className="Signup">
      <Container>
        <Row>
          <Col>
            <h2>Création d'un compte</h2>
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
                `http://localhost:8800/user/signup`,
                { email, password },
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              )
              .then((response) => {
                window.location = "/";
              })
              .catch((error) => {
                console.info(error);
                setError("Création du compte en erreur.Le compte existe déjà");
              });
          }}
          onReset={() => {
            window.location = "/";
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
                    placeholder="Mot de passe"
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
                Créer
              </Button>
            </Col>
            <Col sm="2">
              <Button variant="light" type="reset">
                Annuler
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
}
