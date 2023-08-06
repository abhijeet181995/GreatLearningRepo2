import { combineReducers } from "redux";

import student from "./Student";
import university from "./University";
import common from "./Common";
import course from "./Course";
import company from "./Company.js";

export default combineReducers({
  student,
  university,
  course,
  company,
  common,
});
