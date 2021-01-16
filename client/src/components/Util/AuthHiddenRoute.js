import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const AuthHiddenRoute = ({ component: Component, authenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        !authenticated ? <Component {...props} /> : <Redirect to="/dashboard" />
      }
    />
  );
};

export default connect()(AuthHiddenRoute);
