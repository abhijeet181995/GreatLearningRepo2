import {
  NULL_BYTES32,
  bytes32ToAscii,
  courseContract,
  fetchContractParams,
} from ".";
import { fetchUniversityDetails } from "./University";

// public helper methods
// ----------------------------------------------------------------------------

export const fetchCourseDetails = (from) => async (courseAddress) => {
  const contract = await courseContract.get(courseAddress);
  const studentArr = await fetchContractParams(contract, "getStudents", from);
  const studentCount = (studentArr || []).length;

  const universityAddress = await fetchContractParams(
    contract,
    "getUniversity",
    from
  );

  const university = await fetchUniversityDetails(from)(universityAddress);

  return {
    key: courseAddress,
    instructor: await fetchContractParams(
      contract,
      "getInstructor",
      from,
      NULL_BYTES32,
      bytes32ToAscii
    ),
    university,
    name: await fetchContractParams(
      contract,
      "getName",
      from,
      NULL_BYTES32,
      bytes32ToAscii
    ),
    description: await fetchContractParams(
      contract,
      "getDescription",
      from,
      NULL_BYTES32,
      bytes32ToAscii
    ),
    students: studentCount,
    startDate: await fetchContractParams(
      contract,
      "getStartDate",
      from,
      null,
      (a) => Number(a)
    ),
    endDate: await fetchContractParams(
      contract,
      "getEndDate",
      from,
      null,
      (a) => Number(a)
    ),
    totalMarks: await fetchContractParams(
      contract,
      "getTotalMarks",
      from,
      null,
      (a) => Number(a)
    ),
    isComplete: await fetchContractParams(contract, "getIsComplete", from),
  };
};
