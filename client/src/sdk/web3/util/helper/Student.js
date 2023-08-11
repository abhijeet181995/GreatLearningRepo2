import {
  NULL_ADDRESS,
  NULL_BYTES32,
  bytes32ToAscii,
  fetchContractParams,
  studentContract,
} from ".";
import { fetchCourseDetails } from "./Course";

export const fetchStudentDetails = (from) => async (studentAddress) => {
  const contract = await studentContract.get(studentAddress);

  const coursesAddArr = await fetchContractParams(
    contract,
    "getCourses",
    from,
    NULL_ADDRESS
  );

  const courses = await Promise.all(
    coursesAddArr.map(fetchCourseDetails(from))
  );

  return {
    key: studentAddress,
    name: await fetchContractParams(
      contract,
      "getName",
      from,
      NULL_BYTES32,
      bytes32ToAscii
    ),
    qualification: await fetchContractParams(
      contract,
      "getQualification",
      from,
      NULL_BYTES32,
      bytes32ToAscii
    ),
    image: await fetchContractParams(contract, "getImage", from),
    courses,
  };
};
