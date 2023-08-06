const realm = "web2";

module.exports = {
  common: { ...require("./" + realm + "/Common") },
  company: { ...require("./" + realm + "/Company") },
  course: { ...require("./" + realm + "/Course") },
  university: { ...require("./" + realm + "/University") },
  student: { ...require("./" + realm + "/Student") },
};
