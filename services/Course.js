const mongoose = require("mongoose");
const Course = mongoose.model("courses");

const { fetchUniversityDetails } = require("./University");

module.exports.fetchAllCoursesByUniversity = async (university) => {
  let courses = await Course.find({ university }).lean();
  courses = courses.map((course) => {
    return {
      ...course,
      students: (course.students || []).length,
    };
  });
  return courses;
};

module.exports.fetchAllCourses = async () => {
  const courses = await Course.find({ isComplete: false }).lean();

  return await Promise.all(
    courses.map(async (course) => {
      return {
        ...course,
        students: (course.students || []).length,
        university: await fetchUniversityDetails(course.university),
      };
    })
  );
};

module.exports.fetchCourseByIds = async (ids) => {
  const courses = await Course.find({ key: { $in: ids } }).lean();
  courses.students = (courses.students || []).length;
  return courses;
};

module.exports.fetchCourseById = async (key) => {
  const courses = await Course.find({ key }).lean();
  courses.students = (courses.students || []).length;
  return courses;
};

module.exports.saveCourse = async (inCourse) => {
  await new Course(inCourse).save();
  return await this.fetchCourseById(inCourse.key);
};

module.exports.addStudent = async (key, studentId) => {
  let { students } = await Course.findOne({ key }).lean();
  if (!students) {
    students = [];
  }
  students.push(studentId);
  await Course.findOneAndUpdate({ key }, { students }, { upsert: true });
  return await Course.findOne({ key }).lean();
};

module.exports.removeStudent = async (key, studentId) => {
  let { students } = await Course.findOne({ key }).lean();
  const index = students.indexOf(studentId);
  students = [...students.slice(0, index), ...students.slice(index + 1)];
  await Course.findOneAndUpdate({ key }, { students }, { upsert: true });
  return await Course.findOne({ key }).lean();
};

module.exports.completeCourse = async (key) => {
  await Course.findOneAndUpdate(
    { key },
    { isComplete: true },
    { upsert: true }
  );
  return await Course.findOne({ key }).lean();
};
