import { governanceContract, isValidSignature } from "./util/helper";
import { getWeb3 } from "./web3";
import { fetchCourseDetails } from "./util/helper/Course";
import { fetchUniversityDetails } from "./util/helper/University";
import { fetch } from "../../util/api";

const getCurrentAccount = async () => {
  const { eth } = await getWeb3();
  return (await eth.getAccounts())[0];
};

export const getId = async () => {
  return await getCurrentAccount();
};

export const getCourses = async () => {
  const account = await getCurrentAccount();
  const contract = await governanceContract.get();
  const courses = await contract.getCourses().call();
  return await Promise.all(courses.map(fetchCourseDetails(account)));
};

export const getUniversities = async () => {
  const account = await getCurrentAccount();
  const contract = await governanceContract.get();
  const universities = await contract.getUniversities().call();
  return await Promise.all(universities.map(fetchUniversityDetails(account)));
};

export const validateCertificate = async (cid) => {
  const { certificate, status } = await fetch("/certificate/" + cid);

  if (!certificate || !status) return false;

  const { hash, message, signature } = certificate;
  const {
    university: { publicKey },
  } = message;

  return await isValidSignature(hash, signature, publicKey);
};
