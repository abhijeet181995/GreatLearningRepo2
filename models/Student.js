const mongoose = require("mongoose");
const { Schema } = mongoose;

const studentSchema = new Schema({
  key: String,
  name: String,
  qualification: String,
  courses: [String],
  image: String,
});

mongoose.model("students", studentSchema);
