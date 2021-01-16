import { combineReducers } from "redux";

import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import productReducer from "./productReducer";
import storeReducer from "./storeReducer";

export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  products: productReducer,
  store: storeReducer,
});
