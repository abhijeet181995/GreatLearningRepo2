const mongoose = require("mongoose");
const { Schema } = mongoose;

const courseSchema = new Schema({
  key: String,
  instructor: String,
  startDate: Number,
  endDate: Number,
  totalMarks: Number,
  university: String,
  name: String,
  description: String,
  students: [String],
  isComplete: { type: Boolean, default: false },
});

mongoose.model("courses", courseSchema);
