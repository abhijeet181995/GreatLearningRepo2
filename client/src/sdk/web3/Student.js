import {
  MAX_GAS,
  NULL_ADDRESS,
  asciiToBytes32,
  courseContract,
  governanceContract,
  studentContract,
} from "./util/helper";
import { fetchStudentDetails } from "./util/helper/Student";

// private helper methods
// ----------------------------------------------------------------------------

const fetchStudentAddress = async (studentAccount) => {
  const contract = await governanceContract.get();
  try {
    return await contract.fetchStudent().call({
      from: studentAccount,
    });
  } catch (e) {
    return;
  }
};

const saveStudentAddress = async (studentAddress, studentAccount) => {
  const contract = await governanceContract.get();
  try {
    return await contract.addStudent(studentAddress).send({
      from: studentAccount,
    });
  } catch (e) {
    return;
  }
};

export const update = async (contract, functionName, value, from) => {
  try {
    const updateTx = await contract[functionName](value);

    return await updateTx.send({
      from,
      gas: MAX_GAS,
    });
  } catch (e) {
    return;
  }
};

const addStudentToCourse = (from) => async (studentAddress, courseAddress) => {
  const contract = await courseContract.get(courseAddress);
  try {
    await contract.addStudent(studentAddress).send({
      from,
      gas: MAX_GAS,
    });
  } catch (e) {
    return;
  }
};

// public methods
// ----------------------------------------------------------------------------

export const updateStudentName = async (studentAccount, name) => {
  const studentAddress = await fetchStudentAddress(studentAccount);
  const contract = await studentContract.get(studentAddress);
  try {
    await update(
      contract,
      "setName",
      await asciiToBytes32(name),
      studentAccount
    );
  } catch (e) {
    return;
  }
};

export const updateStudentQualification = async (
  studentAccount,
  qualification
) => {
  const studentAddress = await fetchStudentAddress(studentAccount);
  const contract = await studentContract.get(studentAddress);
  try {
    await update(
      contract,
      "setQualification",
      await asciiToBytes32(qualification),
      studentAccount
    );
  } catch (e) {
    return;
  }
};

export const updateStudentImage = async (studentAccount, image) => {
  const studentAddress = await fetchStudentAddress(studentAccount);
  const contract = await studentContract.get(studentAddress);
  try {
    await update(contract, "setImage", image, studentAccount);
  } catch (e) {
    return;
  }
};

export const applyForCourse = async (studentAccount, courseAddress) => {
  const studentAddress = await fetchStudentAddress(studentAccount);
  const contract = await studentContract.get(studentAddress);
  try {
    await update(contract, "addCourse", courseAddress, studentAccount);
    await addStudentToCourse(studentAccount)(studentAddress, courseAddress);
  } catch (e) {
    return;
  }
};

export const fetchStudent = async (studentAccount) => {
  try {
    let studentAddress = await fetchStudentAddress(studentAccount);

    if (studentAddress === NULL_ADDRESS) {
      studentAddress = await studentContract.new([], studentAccount);
      await saveStudentAddress(studentAddress, studentAccount);
    }

    return await fetchStudentDetails(studentAccount)(studentAddress);
  } catch (e) {
    return;
  }
};

export const fetchCertificate = async (studentAccount, courseAddress) => {
  const studentAddress = await fetchStudentAddress(studentAccount);
  const contract = await studentContract.get(studentAddress);
  try {
    return await contract.getCertificate(courseAddress).call({
      from: studentAccount,
    });
  } catch (e) {
    return;
  }
};
