const mongoose = require("mongoose");
const { Schema } = mongoose;

const companySchema = new Schema({
  key: String,
  name: String,
  place: String,
  image: String,
  allowedUniversities: [String],
});

mongoose.model("companies", companySchema);
