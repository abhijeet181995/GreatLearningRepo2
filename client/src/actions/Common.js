import {
  FETCH_ID,
  FETCH_ALL_COURSES,
  FETCH_ALL_UNIVERSITIES,
  UPDATE_INPUT_HASH,
  CERTIFICATE_VALIDATION_RESULT,
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

export const setHash = (hash) => async (dispatch) => {
  dispatch({ type: UPDATE_INPUT_HASH, payload: hash });
};

export const setStatus = (status) => (dispatch) => {
  dispatch({ type: CERTIFICATE_VALIDATION_RESULT, payload: status });
};

export const validateCertificate = (hash) => async (dispatch) => {
  const isValid = await common.validateCertificate(hash);
  dispatch({ type: CERTIFICATE_VALIDATION_RESULT, payload: isValid });
};
