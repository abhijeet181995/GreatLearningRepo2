import { fetch } from "../../util/api";

export const fetchDetails = async (id) => await fetch("/courses/" + id);

export const addCourse = async (course) =>
  await fetch("/courses", "POST", course);

export const markCourseComplete = async (course) =>
  await fetch("/courses/" + course + "/complete", "POST");
