const {
  fetchCompanyDetails,
  saveCompanyName,
  saveCompanyPlace,
  saveCompanyImage,
  addUniversity,
  removeUniversity,
} = require("../services/Company.js");

module.exports = (app) => {
  app.get("/company/:company", async (req, res) => {
    return res.json(await fetchCompanyDetails(req.params.company));
  });
  app.post("/company/:company/name", async (req, res) => {
    return res.json(await saveCompanyName(req.params.company, req.body.name));
  });
  app.post("/company/:company/image", async (req, res) => {
    return res.json(await saveCompanyImage(req.params.company, req.body.image));
  });
  app.post("/company/:company/place", async (req, res) => {
    return res.json(await saveCompanyPlace(req.params.company, req.body.place));
  });
  app.post("/company/:company/university/:university/add", async (req, res) => {
    return res.json(
      await addUniversity(req.params.company, req.params.company)
    );
  });
  app.post(
    "/company/:company/university/:university/remove",
    async (req, res) => {
      return res.json(
        await removeUniversity(req.params.company, req.params.company)
      );
    }
  );
};
