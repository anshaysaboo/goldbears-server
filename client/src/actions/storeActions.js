import axios from "axios";

import { FETCH_STORE } from "./types.js";
import { displayError } from "./errorActions";
import { tokenConfig } from "./authActions";

export const getStore = () => async (dispatch, getState) => {
  try {
    const res = await axios.get("/api/store", tokenConfig(getState));
    dispatch({ type: FETCH_STORE, payload: res.data });
  } catch (err) {
    console.error(err);
    dispatch(displayError(err.response.data.message));
  }
};
