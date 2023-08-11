import Web3 from "web3";

export const getWeb3 = async () => {
  if (window.ethereum) {
    await window.ethereum.enable();
    return new Web3(window.ethereum);
  } else if (window.web3) {
    return window.web3;
  } else {
    //const provider = new Web3.providers.HttpProvider("http://127.0.0.1:7545");
    //Update Alchemy API_URL in client/.env
     const provider = new Web3.providers.HttpProvider("https://eth-sepolia.g.alchemy.com/v2/GOKFTMlY0P9Po6Eu-9YFlPTkB87o0VUS");
    return new Web3(provider);
  }
};
