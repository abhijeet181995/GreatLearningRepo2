const JWT = process.env.PINATA_IPFS_JWT;
const { getWeb3 } = require("../web3");
const { MAX_GAS, sbtContract } = require("../util/helper");

// public methods
// ----------------------------------------------------------------------------

export const pinFileToIPFS = (file, ceritificateName) => {
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: JWT,
    },
    body: JSON.stringify(file),
  };

  return fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", options)
    .then((response) => response.json())
    .then(({ IpfsHash }) => IpfsHash)
    .catch((err) => console.error(err));
};

//this function is used to get the URI for a token it will return something like https://gateway.pinata.cloud/ipfs/<CID>
export const getTokenURI = async (contractAddress, tokenId) =>
  await sbtContract.get(contractAddress).tokenURI(tokenId).call();

/*this function is used to mint a SBT when we know the address of SBT. "cid" represents the ipfs cid of the token's 
metadata(in our case, metadata would be the json object containing details about certificate)*/
export const safeMint =
  (universityAccount, contractAddress) => async (studentAddress, cid) => {
    //var web3 = new Web3(new Web3.providers.HttpProvider("https://eth-goerli.g.alchemy.com/v2/roVH8bV-MWI_2HnPvDAptauZihuCcIYc"));
    const { eth } = await getWeb3();
    var contract = await sbtContract.get(contractAddress); // new eth.Contract(contract_abi, contractAddress);

    const tx = {
      from: universityAccount,
      to: contractAddress,
      gas: MAX_GAS,
      gasPrice: 23456789,
      data: contract.safeMint(studentAddress, cid).encodeABI(),
    };

    const signedTx = await universityAccount.signTransaction(tx);
    return await eth.sendSignedTransaction(signedTx.rawTransaction);
  };
