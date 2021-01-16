import { FETCH_STORE } from "../actions/types";

const initialState = {
  store: {
    title: "",
    description: "",
    imageUrl: "",
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_STORE:
      return {
        store: {
          ...action.payload,
        },
      };
    default:
      return state;
  }
}
