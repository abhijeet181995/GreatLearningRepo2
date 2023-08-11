const {
  fetchAllCourses,
  fetchAllCoursesByUniversity,
  saveCourse,
  completeCourse,
} = require("../services/Course");

module.exports = (app) => {
  app.get("/courses/:university", async (req, res) => {
    return res.json(await fetchAllCoursesByUniversity(req.params.university));
  });
  app.get("/courses", async (req, res) => {
    return res.json(await fetchAllCourses());
  });
  app.post("/courses/", async (req, res) => {
    return res.json(await saveCourse(req.body));
  });
  app.post("/courses/:course/complete", async (req, res) => {
    return res.json(await completeCourse(req.params.course));
  });
};
