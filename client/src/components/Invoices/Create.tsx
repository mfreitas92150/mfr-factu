import React, { useRef } from "react";
import { Link, useHistory } from "react-router-dom";

const Invoices = () => {
  const inputName = useRef(null);
  const history = useHistory();

  const create = async () => {
    // @ts-ignore
    const name = inputName.current.value;
    const res = await fetch("/api/invoices", {
      method: "post",
      body: JSON.stringify({ name }),
      headers: { "Content-Type": "application/json" },
    });
    history.push("/invoices/list");
  };

  return (
    <div>
      <Link to="/invoices/list">list</Link>
      <h1>Create an invoice</h1>
      Name <input ref={inputName} type="text"></input>
      <br />
      <button onClick={create}>Create</button>
    </div>
  );
};

export default Invoices;
