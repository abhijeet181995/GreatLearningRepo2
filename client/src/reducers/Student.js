import { FETCH_CERTIFICATE, FETCH_STUDENT } from "../actions/types";

function Student(state = {}, action) {
  switch (action.type) {
    case FETCH_STUDENT:
      return { ...state, ...action.payload };

    case FETCH_CERTIFICATE:
      return { ...state, cid: action.payload };

    default:
      return state;
  }
}

export default Student;
