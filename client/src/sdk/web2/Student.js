import { fetch } from "../../util/api";

export const updateStudentName = async (studentId, name) =>
  await fetch("/students/" + studentId + "/name", "POST", { name });

export const updateStudentQualification = async (studentId, qualification) =>
  await fetch("/students/" + studentId + "/qualification", "POST", {
    qualification,
  });

export const updateStudentImage = async (studentId, image) =>
  await fetch("/students/" + studentId + "/image", "POST", { image });

export const applyForCourse = async (studentId, courseId) =>
  await fetch("/students/" + studentId + "/course/" + courseId, "POST");

export const fetchStudent = async (studentId) =>
  await fetch("/students/" + studentId);
