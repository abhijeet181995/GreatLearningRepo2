const mongoose = require("mongoose");
const { fetchCourseByIds, addStudent } = require("./Course");
const { fetchUniversityDetails } = require("./University");

const Student = mongoose.model("students");

module.exports.fetchStudentDetails = async (key) => {
  let student = await Student.findOne({ key }).lean();

  if (!student) {
    student = new Student({ key });
    student.save();
  }

  const courses = await fetchCourseByIds(student.courses);

  return {
    key,
    ...student,
    courses: await Promise.all(
      courses.map(async (course) => {
        return {
          ...course,
          students: (course.students || []).length,
          university: await fetchUniversityDetails(course.university),
        };
      })
    ),
  };
};
module.exports.setStudentName = async (key, name) => {
  await Student.findOneAndUpdate({ key }, { name }, { upsert: true });
  return await this.fetchStudentDetails(key);
};
module.exports.setStudentImage = async (key, image) => {
  await Student.findOneAndUpdate({ key }, { image }, { upsert: true });
  return await this.fetchStudentDetails(key);
};
module.exports.setStudentQualification = async (key, qualification) => {
  await Student.findOneAndUpdate({ key }, { qualification }, { upsert: true });
  return await this.fetchStudentDetails(key);
};
module.exports.setStudentCourse = async (key, course) => {
  const student = await Student.findOne({ key }).lean();
  const courses = student.courses;
  courses.push(course);
  await Student.findOneAndUpdate({ key }, { courses }, { upsert: true });
  await addStudent(course, key);
  return await this.fetchStudentDetails(key);
};
