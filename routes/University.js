const {
  fetchUniversityDetails,
  saveName,
  savePlace,
  searchByName,
  saveImage,
  fetchAllUniversities,
} = require("../services/University.js");

module.exports = (app) => {
  app.get("/university/:university", async (req, res) => {
    return res.json(await fetchUniversityDetails(req.params.university));
  });
  app.post("/university/:university/name", async (req, res) => {
    return res.json(await saveName(req.params.university, req.body.name));
  });
  app.post("/university/:university/place", async (req, res) => {
    return res.json(await savePlace(req.params.university, req.body.place));
  });
  app.post("/university/:university/image", async (req, res) => {
    return res.json(await saveImage(req.params.university, req.body.image));
  });
  app.get("/university/search", async (req, res) => {
    return res.json(await searchByName(req.query.q));
  });
  app.get("/universities", async (req, res) => {
    return res.json(await fetchAllUniversities());
  });
};
