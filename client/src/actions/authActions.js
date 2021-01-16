import axios from "axios";
import { returnErrors, clearErrors } from "./errorActions";
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT_SUCCESS,
} from "./types";

// Check token and load user
export const loadUser = () => async (dispatch, getState) => {
  // User loading
  dispatch({ type: USER_LOADING });
  try {
    const res = await axios.get("/api/auth/user", tokenConfig(getState));
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
    // Redirect the user in case we have the token, meaning Google Auth flow has been completed
    dispatch({ type: LOGIN_SUCCESS, payload: { ...res.data } });
  } catch (err) {
    console.error(err);
    dispatch(returnErrors(err.response.data, err.response.status));
    dispatch({ type: AUTH_ERROR });
  }
};

export const register = ({
  username,
  email,
  password,
  firstName,
  lastName,
}) => async (dispatch) => {
  try {
    dispatch(clearErrors());
    const res = await axios.post("/api/auth/register", {
      username,
      email,
      password,
      firstName,
      lastName,
    });
    dispatch({ type: REGISTER_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: REGISTER_FAIL });
    dispatch(
      returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
    );
  }
};

export const login = ({ username, password }) => async (dispatch, getState) => {
  try {
    dispatch(clearErrors());
    const res = await axios.post("/api/auth/login", {
      username,
      password,
    });
    localStorage.setItem("token", res.data.token);
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: LOGIN_FAIL });
    dispatch(
      returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
    );
  }
};

// Sets up config headers and token
export const tokenConfig = (getState) => {
  const token = getState().auth.token;
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  if (token) config.headers["Authorization"] = "Bearer " + token;
  return config;
};

export const logout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};
