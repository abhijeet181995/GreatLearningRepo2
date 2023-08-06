import { FETCH_STUDENT } from "./types";
import { student } from "../sdk";

export const fetchStudentDetails = (id) => async (dispatch) => {
  const res = await student.fetchStudent(id);
  dispatch({ type: FETCH_STUDENT, payload: res });
};

export const updateStudentName = (id, name) => async (dispatch) => {
  await student.updateStudentName(name);
  const res = await student.fetchStudent(id);
  dispatch({ type: FETCH_STUDENT, payload: res });
};

export const updateStudentQulification =
  (id, qualification) => async (dispatch) => {
    await student.updateStudentQualification(qualification);
    const res = await student.fetchStudent(id);
    dispatch({ type: FETCH_STUDENT, payload: res });
  };

export const updateStudentImage = (id, image) => async (dispatch) => {
  await student.updateStudentImage(image);
  const res = await student.fetchStudent(id);
  dispatch({ type: FETCH_STUDENT, payload: res });
};

export const addStudentToCourse = (studentId, courseId) => async (dispatch) => {
  await student.applyForCourse(studentId, courseId);
  const res = await student.fetchStudent(studentId);
  dispatch({ type: FETCH_STUDENT, payload: res });
};
