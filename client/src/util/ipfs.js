const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')
const JWT = 'Bearer PASTE_YOUR_PINATA_JWT'

export const uploadJSONtoIPFS = async(jsonObject) =>{
    const jsonString = JSON.stringify(jsonObject);
    const filePath = "./certificate.json"
    fs.writeFile(filePath, jsonString, err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file')
            var response
            pinFileToIPFS(filePath).then((value) => {
                var cid = value.IpfsHash
                /**
                 * We need to store this cid in the database.
                 * We can fetch our json file from ipfs through pinata gateway as follows:
                 * https://gateway.pinata.cloud/ipfs/<CID>
                 */
            })
        }
    })
}

const pinFileToIPFS = async (src) => {
    const formData = new FormData();
    
    const file = fs.createReadStream(src)
    formData.append('file', file)
    
    const pinataMetadata = JSON.stringify({
      name: 'File name',
    });
    formData.append('pinataMetadata', pinataMetadata);
    
    const pinataOptions = JSON.stringify({
      cidVersion: 0,
    })
    formData.append('pinataOptions', pinataOptions);

    try{
      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        maxBodyLength: "Infinity",
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          Authorization: JWT
        }
      });
      console.log(res.data);
      return res.data
    } catch (error) {
      console.log(error);
    }
}