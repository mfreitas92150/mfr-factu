import React from "react";
import { Route, Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard.js";
import Login from "./components/Login/Login";
import Logout from "./components/Logout/Logout";
import Signup from "./components/Signup/Signup.js";
import { PrivateRoute } from "./components/PrivateRoute.js";
import "./App.css";

export default function App() {
  return (
    <div className="App">
      <div className="App-content">
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/logout" component={Logout} />
          <Route exact path="/signup" component={Signup} />
          <PrivateRoute path="/" component={Dashboard} /> }
        </Switch>
      </div>
    </div>
  );
}
