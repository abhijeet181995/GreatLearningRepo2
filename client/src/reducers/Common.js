import {
  FETCH_ID,
  FETCH_ALL_COURSES,
  FETCH_ALL_UNIVERSITIES,
  UPDATE_INPUT_HASH,
  CERTIFICATE_VALIDATION_RESULT,
} from "../actions/types";

function Common(state = {}, action) {
  switch (action.type) {
    case FETCH_ID:
      return { ...state, id: action.payload } || false;
    case FETCH_ALL_COURSES:
      return { ...state, courses: action.payload } || false;
    case FETCH_ALL_UNIVERSITIES:
      return { ...state, universities: action.payload } || false;
    case UPDATE_INPUT_HASH:
      return { ...state, hash: action.payload } || false;
    case CERTIFICATE_VALIDATION_RESULT:
      return { ...state, isValid: action.payload } || null;
    default:
      return state;
  }
}

export default Common;
