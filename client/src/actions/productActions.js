import axios from "axios";

import { FETCH_PRODUCTS } from "./types.js";
import { displayError } from "./errorActions";
import { tokenConfig } from "./authActions";

export const getAllProducts = () => async (dispatch, getState) => {
  try {
    const res = await axios.get("/api/store/products", tokenConfig(getState));
    dispatch({ type: FETCH_PRODUCTS, payload: res.data });
  } catch (err) {
    console.error(err);
    dispatch(displayError(err.response.data.message));
  }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    const res = await axios.delete(
      "/api/products/" + id,
      tokenConfig(getState)
    );
    dispatch({ type: FETCH_PRODUCTS, payload: res.data });
  } catch (err) {
    console.error(err);
    dispatch(displayError(err.response.data.message));
  }
};
