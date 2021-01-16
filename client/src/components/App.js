import React from "react";
import { connect } from "react-redux";
import { loadUser } from "../actions/authActions";

import Routes from "./Routes";

class App extends React.Component {
  componentDidMount() {
    this.props.loadUser();
  }

  render() {
    return this.props.isLoading ? (
      <div></div>
    ) : (
      <Routes
        isAuthenticated={this.props.isAuthenticated}
        isLoading={this.props.isLoading}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading,
});

export default connect(mapStateToProps, { loadUser })(App);
