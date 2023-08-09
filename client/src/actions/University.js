import { FETCH_UNIVERSITY } from "./types.js";
import { university as universitySDK, course as courseSDK } from "../sdk";

const getUniversityDetails = async (id) => {
  const university = await universitySDK.fetchDetails(id);
  const courses = await courseSDK.fetchDetails(id);
  return {
    ...university,
    courses: courses.map((course) => {
      return { ...course, university };
    }),
  };
};

export const fetchUniversity = (id) => async (dispatch) => {
  dispatch({
    type: FETCH_UNIVERSITY,
    payload: await getUniversityDetails(id),
  });
};

export const setUniversityName = (id, name) => async (dispatch) => {
  await universitySDK.updateName(id, name);
  dispatch({ type: FETCH_UNIVERSITY, payload: await getUniversityDetails(id) });
};

export const setUniversityPlace = (id, place) => async (dispatch) => {
  await universitySDK.updatePlace(id, place);
  dispatch({ type: FETCH_UNIVERSITY, payload: await getUniversityDetails(id) });
};

export const setUniversityImage = (id, image) => async (dispatch) => {
  await universitySDK.updateImage(id, image);
  dispatch({ type: FETCH_UNIVERSITY, payload: await getUniversityDetails(id) });
};

export const addNewCourse = (course) => async (dispatch) => {
  await courseSDK.addCourse(course);
  dispatch({
    type: FETCH_UNIVERSITY,
    payload: await getUniversityDetails(course.university),
  });
};

export const markCourseComplete = (course, university) => async (dispatch) => {
  await courseSDK.markCourseComplete(course, university);
  dispatch({
    type: FETCH_UNIVERSITY,
    payload: await getUniversityDetails(university),
  });
};
