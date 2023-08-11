const {
  fetchStudentDetails,
  setStudentName,
  setStudentQualification,
  setStudentCourse,
  setStudentImage,
} = require("../services/Student.js");

module.exports = (app) => {
  app.get("/students/:student", async (req, res) => {
    return res.json(await fetchStudentDetails(req.params.student));
  });
  app.post("/students/:student/name", async (req, res) => {
    return res.json(await setStudentName(req.params.student, req.body.name));
  });
  app.post("/students/:student/image", async (req, res) => {
    return res.json(await setStudentImage(req.params.student, req.body.image));
  });
  app.post("/students/:student/qualification", async (req, res) => {
    return res.json(
      await setStudentQualification(req.params.student, req.body.qualification)
    );
  });
  app.post("/students/:student/course/:course", async (req, res) => {
    return res.json(
      await setStudentCourse(req.params.student, req.params.course)
    );
  });
};
