import {
  FETCH_ID,
  FETCH_ALL_COURSES,
  FETCH_ALL_UNIVERSITIES,
} from "../actions/types";

function Common(state = {}, action) {
  switch (action.type) {
    case FETCH_ID:
      return { ...state, id: action.payload.id } || false;
    case FETCH_ALL_COURSES:
      return { ...state, courses: action.payload } || false;
    case FETCH_ALL_UNIVERSITIES:
      return { ...state, universities: action.payload } || false;
    default:
      return state;
  }
}

export default Common;
