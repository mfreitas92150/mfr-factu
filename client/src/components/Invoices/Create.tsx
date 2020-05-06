import React from "react";
import { useHistory } from "react-router-dom";
import { Container } from "react-bootstrap";
import * as api from "../../utils/invoices";
import { Formik, Form, Field, ErrorMessage } from "formik";

const Invoices = () => {
  const history = useHistory();

  const init = {
    name: "",
    clientId: "",
  };

  const submit = async (values: any) => {
    await api.create(values);
    history.push("/invoices/list");
  };

  return (
    <Container>
      <h1>Créer une facture</h1>
      <Formik initialValues={init} onSubmit={submit}>
        <Form>
          <label htmlFor="name">Name</label>
          <Field name="name" type="text" />
          <ErrorMessage name="name" />
          <br />
          <label htmlFor="clientId">Client</label>
          <Field name="clientId" type="text" />
          <ErrorMessage name="clientId" />
          <br />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </Container>
  );
};

export default Invoices;
