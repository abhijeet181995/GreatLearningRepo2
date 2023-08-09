import {
  MAX_GAS,
  NULL_ADDRESS,
  NULL_BYTES32,
  asciiToBytes32,
  bytes32ToAscii,
  companyContract,
  fetchContractParams,
  governanceContract,
} from "./util/helper";
import { fetchUniversityDetails } from "./util/helper/University";

// private helper methods
// ----------------------------------------------------------------------------

const fetchCompanyAddress = async (account) => {
  const contract = await governanceContract.get();
  return await contract.fetchCompany().call({
    from: account,
  });
};

const generateCompanyAddress = async (account) =>
  await companyContract.new([], account);

const saveCompanyAddress = async (companyAddress, companyAccount) => {
  const contract = await governanceContract.get();
  const addCompanyTx = await contract.addCompany(companyAddress);
  try {
    return await addCompanyTx.send({
      from: companyAccount,
    });
  } catch (e) {
    return;
  }
};

// public methods
// ----------------------------------------------------------------------------
export const fetchCompany = async (companyAccount) => {
  let companyAddress = await fetchCompanyAddress(companyAccount);
  if (companyAddress === NULL_ADDRESS) {
    companyAddress = await generateCompanyAddress(companyAccount);
    await saveCompanyAddress(companyAddress, companyAccount);
  }

  const contract = await companyContract.get(companyAddress);

  const universitiesAddArr = await fetchContractParams(
    contract,
    "getUniversities",
    companyAccount
  );

  const allowedUniversities = await Promise.all(
    universitiesAddArr.map(fetchUniversityDetails(companyAccount))
  );

  return {
    key: companyAddress,
    name: await fetchContractParams(
      contract,
      "getName",
      companyAccount,
      NULL_BYTES32,
      bytes32ToAscii
    ),
    place: await fetchContractParams(
      contract,
      "getPlace",
      companyAccount,
      NULL_BYTES32,
      bytes32ToAscii
    ),
    image: await fetchContractParams(contract, "getImage", companyAccount),
    allowedUniversities,
  };
};

export const updateCompanyName = async (companyAccount, name) => {
  const companyAddress = await fetchCompanyAddress(companyAccount);
  if (companyAddress === NULL_ADDRESS) return;

  const contract = await companyContract.get(companyAddress);
  try {
    await contract.setName(await asciiToBytes32(name)).send({
      from: companyAccount,
      gas: MAX_GAS,
    });
  } catch (e) {
    return;
  }
};

export const updateCompanyPlace = async (companyAccount, place) => {
  const companyAddress = await fetchCompanyAddress(companyAccount);
  if (companyAddress === NULL_ADDRESS) return;

  const contract = await companyContract.get(companyAddress);
  try {
    await contract.setPlace(await asciiToBytes32(place)).send({
      from: companyAccount,
      gas: MAX_GAS,
    });
  } catch (e) {
    return;
  }
};

export const updateCompanyImage = async (companyAccount, image) => {
  const companyAddress = await fetchCompanyAddress(companyAccount);
  if (companyAddress === NULL_ADDRESS) return;

  const contract = await companyContract.get(companyAddress);
  try {
    await contract.setImage(image).send({
      from: companyAccount,
      gas: MAX_GAS,
    });
  } catch (e) {
    return;
  }
};

export const allowUniversity = async (companyAccount, university) => {
  const companyAddress = await fetchCompanyAddress(companyAccount);
  const contract = await companyContract.get(companyAddress);
  try {
    await contract.addUniversity(university.key).send({
      from: companyAccount,
      gas: MAX_GAS,
    });
  } catch (e) {
    return;
  }
};

export const removeUniversity = async (companyAccount, university) => {
  const companyAddress = await fetchCompanyAddress(companyAccount);
  const contract = await companyContract.get(companyAddress);
  const universities = await contract.getUniversities().call();
  const index = universities.indexOf(university.key);

  if (index < 0) return;

  try {
    await contract.removeUniversity(index).send({
      from: companyAccount,
      gas: MAX_GAS,
    });
  } catch (e) {
    return;
  }
};
