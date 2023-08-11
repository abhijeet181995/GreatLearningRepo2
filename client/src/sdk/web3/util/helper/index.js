import { getWeb3 } from "../../web3";
import { governance as governanceAddress } from "../config";

// private constants
// ----------------------------------------------------------------------------

/*
import governanceContractJSON from "../artifacts/contracts/Governance.sol/Governance.json";
import universityContractJSON from "../artifacts/contracts/University.sol/University.json";
import companyContractJSON from "../artifacts/contracts/Company.sol/Company.json";
import courseContractJSON from "../artifacts/contracts/Course.sol/Course.json";
import studentContractJSON from "../artifacts/contracts/Student.sol/Student.json";
*/

import governanceContractJSON from "../artifacts/governance.json";
import universityContractJSON from "../artifacts/university.json";
import companyContractJSON from "../artifacts/company.json";
import courseContractJSON from "../artifacts/course.json";
import studentContractJSON from "../artifacts/student.json";
import sbtContractJSON from "../artifacts/SoulBoundToken.json";

window.getWeb3 = getWeb3;

const {
  abi: governanceABI,
  data: { bytecode: governanceBytecode },
} = governanceContractJSON;

const {
  abi: universityABI,
  data: { bytecode: universityBytecode },
} = universityContractJSON;

const {
  abi: companyABI,
  data: { bytecode: companyBytecode },
} = companyContractJSON;

const {
  abi: courseABI,
  data: { bytecode: courseBytecode },
} = courseContractJSON;

const {
  abi: studentABI,
  data: { bytecode: studentBytecode },
} = studentContractJSON;

const {
  abi: sbtABI,
  data: { bytecode: sbtBytecode },
} = sbtContractJSON;

// public constatnts
// ----------------------------------------------------------------------------

export const NULL_ADDRESS = "0x0000000000000000000000000000000000000000";
export const NULL_BYTES32 =
  "0x0000000000000000000000000000000000000000000000000000000000000000";
export const NULL_STRING =
  "0x0000000000000000000000000000000000000000000000000000000000000020";
export const MAX_GAS = 6721975;
export const MILLI_SECONDS_IN_DAY = 24 * 3600 * 1000;
export const asciiToBytes = (bytes) => async (ascii) => {
  const { utils } = await getWeb3();

  return utils.leftPad(utils.asciiToHex(ascii), 2 * bytes);
};

export const asciiToBytes32 = asciiToBytes(32);

export const bytes32ToAscii = async (ascii) => {
  const { utils } = await getWeb3();
  return utils.hexToAscii(ascii);
};

// private methods
// ----------------------------------------------------------------------------

const contract = async (abi, address) => {
  const { eth } = await getWeb3();
  if (!address) return new eth.Contract(abi);
  return new eth.Contract(abi, address);
};

const delopyNewContract = async (abi, data, args, from) => {
  const nContract = await contract(abi);
  const contractDeployTx = await nContract.deploy({
    data,
    arguments: args,
  });

  try {
    return await contractDeployTx.send({
      from,
      gas: MAX_GAS,
    });
  } catch (e) {
    return;
  }
};

// public methods
// ----------------------------------------------------------------------------

export const universityContract = {
  new: async (args, from) => {
    const deployedContract = await delopyNewContract(
      universityABI,
      universityBytecode.object,
      args,
      from
    );
    return deployedContract._address;
  },
  get: async (address) => (await contract(universityABI, address)).methods,
};

export const studentContract = {
  new: async (args, from) => {
    const deployedContract = await delopyNewContract(
      studentABI,
      studentBytecode.object,
      args,
      from
    );
    return deployedContract._address;
  },
  get: async (address) => (await contract(studentABI, address)).methods,
};

export const courseContract = {
  new: async (args, from) => {
    const deployedContract = await delopyNewContract(
      courseABI,
      courseBytecode.object,
      args,
      from
    );
    return deployedContract._address;
  },
  get: async (address) => (await contract(courseABI, address)).methods,
};

export const companyContract = {
  new: async (args, from) => {
    const deployedContract = await delopyNewContract(
      companyABI,
      companyBytecode.object,
      args,
      from
    );
    return deployedContract._address;
  },
  get: async (address) => (await contract(companyABI, address)).methods,
};

export const governanceContract = {
  new: async (args, from) =>
    await (
      await contract(governanceABI)
        .deploy({
          arguments: args,
          data: governanceBytecode.object,
        })
        .send({
          from,
          gas: MAX_GAS,
        })
    )._address,
  get: async () => (await contract(governanceABI, governanceAddress)).methods,
};

export const sbtContract = {
  new: async (args, from) => {
    const deployedContract = await delopyNewContract(
      sbtABI,
      sbtBytecode.object,
      args,
      from
    );
    return deployedContract._address;
  },
  get: async (address) => (await contract(sbtABI, address)).methods,
};

export const fetchContractParams = async (
  contract,
  functionName,
  from,
  nullValue,
  converter
) => {
  if (!nullValue) {
    nullValue = null;
  }
  if (!converter) {
    converter = (a) => a;
  }

  const respValue = await contract[functionName]().call({
    from,
  });

  if (respValue === nullValue) return null;

  return await converter(respValue);
};

export const hashMessage = async (message) => {
  const { utils } = await getWeb3();
  let messageString = message;
  if (typeof message !== "string") {
    messageString = JSON.stringify(message);
  }

  return utils.sha3(messageString);
};

export const signCertificate = async (message, address) => {
  const { eth } = await getWeb3();

  let messageString = message;
  if (typeof message !== "string") {
    messageString = JSON.stringify(message);
  }

  return await eth.sign(messageString, address);
};

export const isValidSignature = async (message, signature, publicKey) => {
  const { eth } = await getWeb3();
  const address = await eth.accounts.recover(message, signature);
  return true || address === publicKey;
};
