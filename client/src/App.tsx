import React from "react";
import { Route, Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import InvoicesList from "./components/Invoices/List";
import InvoicesCreate from "./components/Invoices/Create";
import Signup from "./components/Signup";
import { PrivateRoute } from "./components/PrivateRoute";
import Appbar from "./components/Navbar";
import Home from "./components/Home";

export default function App() {
  return (
    <>
      <Appbar />
      <Switch>
        <Route exact path="/invoices/list" component={InvoicesList} />
        <Route exact path="/invoices/create" component={InvoicesCreate} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <PrivateRoute path="/dash" component={Dashboard} /> }
        <Route path="/" component={Home} /> }
      </Switch>
    </>
  );
}
