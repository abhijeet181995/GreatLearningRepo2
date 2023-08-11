import { FETCH_CERTIFICATE, FETCH_STUDENT } from "./types";
import { student } from "../sdk";

export const fetchStudentDetails = (id) => async (dispatch) => {
  const res = await student.fetchStudent(id);
  dispatch({ type: FETCH_STUDENT, payload: res });
};

export const updateStudentName = (id, name) => async (dispatch) => {
  await student.updateStudentName(id, name);
  const res = await student.fetchStudent(id);
  dispatch({ type: FETCH_STUDENT, payload: res });
};

export const updateStudentQulification =
  (id, qualification) => async (dispatch) => {
    await student.updateStudentQualification(id, qualification);
    const res = await student.fetchStudent(id);
    dispatch({ type: FETCH_STUDENT, payload: res });
  };

export const updateStudentImage = (id, image) => async (dispatch) => {
  await student.updateStudentImage(id, image);
  const res = await student.fetchStudent(id);
  dispatch({ type: FETCH_STUDENT, payload: res });
};

export const addStudentToCourse = (studentId, courseId) => async (dispatch) => {
  await student.applyForCourse(studentId, courseId);
  const res = await student.fetchStudent(studentId);
  dispatch({ type: FETCH_STUDENT, payload: res });
};

export const fetchCerificate = (studentId, courseId) => async (dispatch) => {
  const res = await student.fetchCertificate(studentId, courseId);
  dispatch({ type: FETCH_CERTIFICATE, payload: res });
};
