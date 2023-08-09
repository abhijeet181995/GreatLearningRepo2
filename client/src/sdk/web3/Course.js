import {
  fetchUniversityAddress,
  fetchUniversityDetails,
} from "./util/helper/University";
import {
  MAX_GAS,
  MILLI_SECONDS_IN_DAY,
  NULL_ADDRESS,
  asciiToBytes32,
  courseContract,
  governanceContract,
  hashMessage,
  signCertificate,
  studentContract,
  universityContract,
} from "./util/helper";
import { fetchCourseDetails } from "./util/helper/Course";
import { pinFileToIPFS } from "./util/ipfs";
import { fetchStudentDetails } from "./util/helper/Student";

// private helper methods
// ----------------------------------------------------------------------------

const saveCourseCertificate = async (
  totalMarks,
  endDate,
  startDate,
  studentAddress,
  studentDetailsFetcher,
  universityAddress,
  universityAccount,
  universityDetails,
  courseAddress,
  courseDetails
) => {
  const marks = parseInt(Math.floor(Math.random() * totalMarks));
  const attendence = parseInt(
    Math.random() * ((endDate - startDate) / MILLI_SECONDS_IN_DAY)
  );

  const message = {
    student: {
      address: studentAddress,
      publicKey: "",
      details: await studentDetailsFetcher(studentAddress),
    },
    university: {
      address: universityAddress,
      publicKey: universityAccount,
      details: universityDetails,
    },
    course: { address: courseAddress, details: courseDetails },
    performance: { marks, attendence },
    date: Date.now(),
  };

  const hash = await hashMessage(message);
  const signature = await signCertificate(hash, universityAccount);
  const certificate = { message, hash, signature };

  const cid = await pinFileToIPFS(
    certificate,
    `${universityAddress}_${courseAddress}_${studentAddress}`
  );

  const contract = await studentContract.get(studentAddress);

  try {
    await contract.addCertificate(courseAddress, cid).send({
      from: universityAccount,
      gas: MAX_GAS,
    });
  } catch (e) {
    return;
  }
};

// public methods
// ----------------------------------------------------------------------------

export const fetchDetails = async (universityAccount) => {
  const universityAddress = await fetchUniversityAddress(universityAccount);
  if (universityAddress === NULL_ADDRESS) return [];
  const { courses } = await fetchUniversityDetails(universityAccount)(
    universityAddress
  );

  return await Promise.all(courses.map(fetchCourseDetails(universityAccount)));
};

export const addCourse = async (course) => {
  try {
    const universityAccount = course.university;
    const universityAddress = await fetchUniversityAddress(universityAccount);

    const courseAddress = await courseContract.new(
      [
        await asciiToBytes32(course.instructor),
        await asciiToBytes32(course.name),
        await asciiToBytes32(course.description),
        course.startDate,
        course.endDate,
        parseInt(course.totalMarks),
        universityAddress,
      ],
      universityAccount
    );

    const contract = await universityContract.get(universityAddress);
    await contract.createCourse(courseAddress).send({
      from: universityAccount,
      gas: MAX_GAS,
    });

    const governanceC = await governanceContract.get();

    await governanceC
      .addCourse(courseAddress)
      .send({ from: universityAccount, gas: MAX_GAS });
  } catch (e) {
    console.error(e);
  }
};

export const markCourseComplete = async (courseAddress, universityAccount) => {
  const contract = await courseContract.get(courseAddress);
  const universityAddress = await fetchUniversityAddress(universityAccount);

  try {
    await contract.setIsComplete().send({
      from: universityAccount,
      gas: MAX_GAS,
    });
  } catch (e) {
    return;
  }
  const studentAddArr = await contract.getStudents().call();
  const courseDetails = await fetchCourseDetails(universityAccount)(
    courseAddress
  );

  const universityDetails = await fetchUniversityDetails(universityAccount)(
    universityAddress
  );
  const { totalMarks, startDate, endDate } = courseDetails;

  const studentDetailsFetcher = fetchStudentDetails(universityAccount);

  await Promise.all(
    studentAddArr.map((studentAddress) =>
      saveCourseCertificate(
        totalMarks,
        endDate,
        startDate,
        studentAddress,
        studentDetailsFetcher,
        universityAddress,
        universityAccount,
        universityDetails,
        courseAddress,
        courseDetails
      )
    )
  );
};
