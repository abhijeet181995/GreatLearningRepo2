const mongoose = require("mongoose");
const { Schema } = mongoose;

const universitySchema = new Schema({
  key: String,
  name: String,
  place: String,
  image: String,
});

mongoose.model("universities", universitySchema);
