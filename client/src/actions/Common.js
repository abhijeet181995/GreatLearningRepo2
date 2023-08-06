import {
  FETCH_ID,
  FETCH_ALL_COURSES,
  FETCH_ALL_UNIVERSITIES,
} from "./types.js";
import { common } from "../sdk";

export const fetchId = () => async (dispatch) => {
  const res = await common.getId();
  dispatch({ type: FETCH_ID, payload: res });
};

export const fetchAllCourses = () => async (dispatch) => {
  const res = await common.getCourses();
  dispatch({ type: FETCH_ALL_COURSES, payload: res });
};

export const fetchAllUniversities = () => async (dispatch) => {
  const res = await common.getUniversities();
  dispatch({ type: FETCH_ALL_UNIVERSITIES, payload: res });
};
