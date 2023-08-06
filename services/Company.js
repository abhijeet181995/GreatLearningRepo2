const mongoose = require("mongoose");

const Company = mongoose.model("companies");

const { fetchUniversityDetails } = require("./University");

const getCompany = async (key) => {
  return await Company.findOne({ key }).lean();
};

module.exports.fetchCompanyDetails = async (key) => {
  let company = await getCompany(key);
  if (company === null) {
    new Company({ key }).save();
    company = await getCompany();
  }
  company.allowedUniversities = await Promise.all(
    company.allowedUniversities.map(fetchUniversityDetails)
  );
  return company;
};
module.exports.saveCompanyName = async (key, name) => {
  await Company.findOneAndUpdate({ key }, { name }, { upsert: true });
  return getCompany(key);
};
module.exports.saveCompanyPlace = async (key, place) => {
  await Company.findOneAndUpdate({ key }, { place }, { upsert: true });
  return getCompany(key);
};
module.exports.saveCompanyImage = async (key, image) => {
  await Company.findOneAndUpdate({ key }, { image }, { upsert: true });
  return getCompany(key);
};
module.exports.addUniversity = async (key, university) => {
  const { allowedUniversities } = await getCompany(key);
  allowedUniversities.push(university);
  await Company.findOneAndUpdate(
    { key },
    { allowedUniversities },
    { upsert: true }
  );
  return getCompany(key);
};
module.exports.removeUniversity = async (key, university) => {
  let { allowedUniversities } = await getCompany(key);
  const index = allowedUniversities.indexOf(university);
  allowedUniversities = [
    ...allowedUniversities.slice(0, index),
    ...allowedUniversities.slice(index + 1),
  ];
  await Company.findOneAndUpdate(
    { key },
    { allowedUniversities },
    { upsert: true }
  );
  return getCompany(key);
};
