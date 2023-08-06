import { fetch } from "../../util/api";

export const getId = async () => {
  return await fetch("/id");
};

export const getCourses = async () => {
  return await fetch("/courses");
};

export const getUniversities = async () => {
  return await fetch("/universities");
};
