import React from "react";
import * as API from "../utils/API";
import { Row, Col, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export default function Dashboard() {
  const history = useHistory();
  return (
    <div>
      Dashboard
      <Row>
        <Col>
          <Button
            variant="light"
            onClick={() => {
              API.logout();
              history.push("/");
            }}
          >
            Déconnexion
          </Button>
        </Col>
      </Row>
    </div>
  );
}
