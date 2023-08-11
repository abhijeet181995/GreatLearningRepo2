import { FETCH_UNIVERSITY } from "../actions/types";

function University(state = {}, action) {
  switch (action.type) {
    case FETCH_UNIVERSITY:
      return { ...state, ...action.payload } || false;

    default:
      return state;
  }
}

export default University;
