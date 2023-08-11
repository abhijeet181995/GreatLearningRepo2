import { fetch } from "../../util/api";

export const fetchDetails = async (id) => await fetch("/university/" + id);

export const updateName = async (id, name) =>
  await fetch("/university/" + id + "/name", "POST", { name });

export const updatePlace = async (id, place) =>
  await fetch("/university/" + id + "/place", "POST", { place });

export const updateImage = async (id, image) =>
  await fetch("/university/" + id + "/image", "POST", { image });
