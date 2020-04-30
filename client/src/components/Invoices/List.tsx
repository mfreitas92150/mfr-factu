import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Invoice {
  _id: string; // TODO remove implementation leak
  name: String;
}

const Invoices = () => {
  const [i, setI] = useState<Invoice[]>([]);
  const [dirty, setDirty] = useState(true);

  useEffect(() => {
    const get = async () => {
      const res = await fetch("/api/invoices");
      const json = await res.json();
      console.log(json);
      setI(json);
      setDirty(false);
    };
    if (dirty) get();
  }, [dirty]);

  const htmlInvoices = i.map((invoice, i) => (
    <div key={i}>
      <b>Invoice {invoice.name}</b>{" "}
      <button
        onClick={async () => {
          const res = await fetch(`/api/invoices/${invoice._id}`, {
            method: "delete",
          });
          setDirty(true);
        }}
      >
        delete
      </button>
      <br />
      {JSON.stringify(invoice)}
    </div>
  ));

  return (
    <div>
      <Link to="/invoices/create">create</Link>
      <h1>Invoices</h1>
      {htmlInvoices}
    </div>
  );
};

export default Invoices;
