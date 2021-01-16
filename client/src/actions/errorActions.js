import { GET_ERRORS, CLEAR_ERRORS, DISPLAY_ERROR } from "./types";

// RETURN ERRORS
export const returnErrors = (message, status, id = null) => {
  return {
    type: GET_ERRORS,
    payload: { message, status, id },
  };
};

// CLEAR ALL ERRORS
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};

// DISPLAY AN ERROR TO THE USER
export const displayError = (message) => {
  return {
    type: DISPLAY_ERROR,
    payload: { message },
  };
};
