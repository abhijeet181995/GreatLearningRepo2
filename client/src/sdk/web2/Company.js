import { fetch } from "../../util/api";

export const fetchCompany = async (id) => await fetch("/company/" + id);

export const updateCompanyName = async (id, name) =>
  await fetch("/company/" + id + "/name", "POST", { name });

export const updateCompanyPlace = async (id, place) =>
  await fetch("/company/" + id + "/place", "POST", { place });

export const updateCompanyImage = async (id, image) =>
  await fetch("/company/" + id + "/image", "POST", { image });

export const allowUniversity = async (id, university) =>
  await fetch("/company/" + id + "/university/" + university + "/add", "POST");

export const removeUniversity = async (id, university) =>
  await fetch(
    "/company/" + id + "/university/" + university + "/remove",
    "POST"
  );
