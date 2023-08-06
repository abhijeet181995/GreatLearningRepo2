import { FETCH_COMPANY } from "./types";
import { company } from "../sdk";

export const fetchCompanyDetails = (id) => async (dispatch) => {
  const res = await company.fetchCompany(id);
  dispatch({ type: FETCH_COMPANY, payload: res });
};

export const setCompanyName = (id, name) => async (dispatch) => {
  await company.updateCompanyName(id, name);
  const res = await company.fetchCompany(id);
  dispatch({ type: FETCH_COMPANY, payload: res });
};

export const setCompanyPlace = (id, place) => async (dispatch) => {
  await company.updateCompanyPlace(id, place);
  const res = await company.fetchCompany(id);
  dispatch({ type: FETCH_COMPANY, payload: res });
};

export const setCompanyImage = (id, image) => async (dispatch) => {
  await company.updateCompanyImage(id, image);
  const res = await company.fetchCompany(id);
  dispatch({ type: FETCH_COMPANY, payload: res });
};

export const addAllowedUniversity = (id, university) => async (dispatch) => {
  await company.allowUniversity(id, university);
  const res = await company.fetchCompany(id);
  dispatch({ type: FETCH_COMPANY, payload: res });
};

export const removeAllowedUniversity = (id, university) => async (dispatch) => {
  await company.removeUniversity(id, university);
  const res = await company.fetchCompany(id);
  dispatch({ type: FETCH_COMPANY, payload: res });
};
