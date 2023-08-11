import {
  MAX_GAS,
  NULL_ADDRESS,
  asciiToBytes32,
  governanceContract,
  universityContract,
} from "./util/helper";

import {
  fetchUniversityAddress,
  fetchUniversityDetails,
} from "./util/helper/University";

// private helper methods
// ----------------------------------------------------------------------------

const generateUniversityAddress = async (account) =>
  await universityContract.new([], account);

const saveUniversityAddress = async (address, account) => {
  const contract = await governanceContract.get();
  try {
    await contract.addUniversity(address).send({
      from: account,
    });
  } catch (e) {
    return;
  }
};

// public methods
// ----------------------------------------------------------------------------

export const fetchDetails = async (universityAccount) => {
  let universityAddress = await fetchUniversityAddress(universityAccount);

  try {
    if (universityAddress === NULL_ADDRESS) {
      universityAddress = await generateUniversityAddress(universityAccount);
      await saveUniversityAddress(universityAddress, universityAccount);
    }
  } catch (e) {
    return;
  }

  return await fetchUniversityDetails(universityAccount)(universityAddress);
};

export const updateName = async (universityAccount, name) => {
  const universityAddress = await fetchUniversityAddress(universityAccount);
  const contract = await universityContract.get(universityAddress);
  try {
    await contract.setName(await asciiToBytes32(name)).send({
      from: universityAccount,
      gas: MAX_GAS,
    });
  } catch (e) {
    return;
  }
};

export const updatePlace = async (universityAccount, place) => {
  const universityAddress = await fetchUniversityAddress(universityAccount);
  const contract = await universityContract.get(universityAddress);
  try {
    await contract.setPlace(await asciiToBytes32(place)).send({
      from: universityAccount,
      gas: MAX_GAS,
    });
  } catch (e) {
    return;
  }
};

export const updateImage = async (universityAccount, image) => {
  const universityAddress = await fetchUniversityAddress(universityAccount);
  const contract = await universityContract.get(universityAddress);
  try {
    await contract.setImage(image).send({
      from: universityAccount,
      gas: MAX_GAS,
    });
  } catch (e) {
    return;
  }
};
