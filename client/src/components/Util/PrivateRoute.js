import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => {
  const renderRoute = (props) => {
    if (authenticated) {
      return <Component {...props} />;
    } else {
      return <Redirect to="/login" />;
    }
  };

  return <Route {...rest} render={(props) => renderRoute(props)} />;
};

export default connect()(PrivateRoute);
