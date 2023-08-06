import { FETCH_COMPANY } from "../actions/types";

function Company(state = {}, action) {
  switch (action.type) {
    case FETCH_COMPANY:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export default Company;
