import React from "react";
import { Container, ButtonGroup } from "react-bootstrap";
import IconTool from "./IconTool";

const Appbar = () => {
  return (
    <Container>
      <h1 className="mb-5">Accueil</h1>
      <h3>
        Factures
        <ButtonGroup className="ml-3">
          <IconTool
            tooltip="Liste des factures"
            link="/invoices/list"
            icon="list"
          />
          <IconTool
            tooltip="Créer une facture"
            link="/invoices/create"
            icon="plus"
          />
        </ButtonGroup>
      </h3>
    </Container>
  );
};

export default Appbar;
