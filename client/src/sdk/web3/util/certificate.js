import { fetchCourseDetails } from "./helper/Course";

export const generateCertificate =
  (from) => (universityAddress, courseAddress) => async (studentAddress) => {
    const course = await fetchCourseDetails(from);
    const message = {
      course,
    };
    const signature = {};

    return {
      message,
      signature,
      publicKey: universityAddress,
    };
  };
