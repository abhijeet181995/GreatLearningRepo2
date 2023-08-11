const mongoose = require("mongoose");
const University = mongoose.model("universities");

module.exports.fetchUniversityDetails = async (key) => {
  let university = await University.findOne({ key }).lean();
  if (!university) {
    university = new University({ key });
    university.save();
  }

  return university;
};
module.exports.saveName = async (key, name) => {
  await University.findOneAndUpdate({ key }, { name }, { upsert: false });
  return await this.fetchUniversityDetails(key);
};
module.exports.savePlace = async (key, place) => {
  await University.findOneAndUpdate({ key }, { place }, { upsert: false });
  return await this.fetchUniversityDetails(key);
};
module.exports.saveImage = async (key, image) => {
  await University.findOneAndUpdate({ key }, { image }, { upsert: false });
  return await this.fetchUniversityDetails(key);
};
module.exports.searchByName = async (query) => {
  return await University.find({
    name: new RegExp(query, "i"),
  }).lean();
};
module.exports.fetchAllUniversities = async () => {
  return await University.find().lean();
};
