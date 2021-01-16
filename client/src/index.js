import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";

// ENABLE IN DEVELOPMENT
import { composeWithDevTools } from "redux-devtools-extension";

import App from "./components/App.js";
import reducers from "./reducers";

import "antd/dist/antd.css";

// WARN: Remove in production
const store = createStore(
  reducers,
  {},
  composeWithDevTools(applyMiddleware(reduxThunk))
);
// composeWithDevTools(applyMiddleware(reduxThunk)) <- FOR DEVELOPMENT

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
