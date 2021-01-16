import React from "react";
import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";
import PropTypes from "prop-types";

import PrivateRoute from "./Util/PrivateRoute";
import AuthHiddenRoute from "./Util/AuthHiddenRoute";

import Login from "./Views/Login.js";
import Dashboard from "./Views/Dashboard.js";

class Routes extends React.Component {
  propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
  };

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>

          <AuthHiddenRoute
            exact
            path="/login"
            component={Login}
            authenticated={this.props.isAuthenticated}
          />

          <Route exact path="/dashboard">
            <Redirect to="/dashboard/store" />
          </Route>

          <PrivateRoute
            path={"/dashboard"}
            component={Dashboard}
            authenticated={this.props.isAuthenticated}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Routes;
