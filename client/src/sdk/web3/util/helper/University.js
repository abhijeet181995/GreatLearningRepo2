import {
  NULL_BYTES32,
  bytes32ToAscii,
  fetchContractParams,
  governanceContract,
  universityContract,
} from ".";

// public methods
// ----------------------------------------------------------------------------

export const fetchUniversityAddress = async (account) => {
  const contract = await governanceContract.get();
  return contract.fetchUniversity(account).call({
    from: account,
  });
};

export const fetchUniversityDetails = (from) => async (universityAddress) => {
  const contract = await universityContract.get(universityAddress);

  return {
    key: universityAddress,
    name: await fetchContractParams(
      contract,
      "getName",
      from,
      NULL_BYTES32,
      bytes32ToAscii
    ),
    place: await fetchContractParams(
      contract,
      "getPlace",
      from,
      NULL_BYTES32,
      bytes32ToAscii
    ),
    image: await fetchContractParams(contract, "getImage", from),
    courses: await fetchContractParams(contract, "getCourses", from),
  };
};
