import React, { useEffect, useState } from "react";
import { Container, Alert } from "react-bootstrap";
import * as api from "../../utils/invoices";
import IconTool from "../IconTool";

const Invoices = () => {
  const [invoices, setInvoices] = useState<api.Invoice[]>([]);
  const [isDirty, setDirty] = useState(true);

  useEffect(() => {
    const get = async () => {
      const res = await api.list();
      console.log(`Fetched ${res.length} invoices`);
      setInvoices(res);
      setDirty(false);
    };
    if (isDirty) get();
  }, [isDirty]);

  const htmlInvoices = invoices.length ? (
    invoices.map((invoice) => (
      <div key={invoice.id}>
        <b>Invoice {invoice.name}</b>{" "}
        <IconTool
          className="ml-3"
          tooltip="Supprimer cette facture"
          onClick={async () => {
            await api.remove(invoice.id);
            setDirty(true);
          }}
          icon="trash"
        />
        <br />
        {JSON.stringify(invoice)}
      </div>
    ))
  ) : (
    <Alert variant="warning">Pas de facture pour le moment</Alert>
  );

  return (
    <Container>
      <h1>
        Liste des factures
        <IconTool
          className="ml-3"
          tooltip="Créer une facture"
          link="/invoices/create"
          icon="plus"
        />
      </h1>
      {htmlInvoices}
    </Container>
  );
};

export default Invoices;
