
const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authenticateToken');
const { getAllImages } = require('../controllers/getImageController');

router.post("/getAllImages", authenticateToken, getAllImages);

module.exports = router;

// const express = require('express');
// const router = express.Router();
// const UserModel = require("../models/User");
// const { decryptData } = require("../utils/decryption");
// const { authenticateToken } = require('../middleware/authentication');
// const axios = require("axios")

// const returnResponse = async(ipfsHash)=>{
//     const res = await axios.get(`https://gateway.pinata.cloud/ipfs/${ipfsHash}`);
//     return res.data;
// }
// router.post("/getAllImages",authenticateToken, async (req, res) => {
//   try {
//       const userId = req.accountAddress;
//       const ipfsHashesArray = req.body
 
//       const user = await UserModel.findOne({ userId: userId });
      
//       const encryptedDataArr = await Promise.all(ipfsHashesArray.map(async (ipfsHash) => {
//         const response = await returnResponse(ipfsHash);
//         return response
//       }));

//       if (!user) {
//           throw new Error('User not found with ID: ' + userId);
//       }

//       const decryptedImages = [];

//       // Iterate over each pair of encryptedData and iv, decrypt them, and store in decryptedImages
//       for (const pair of encryptedDataArr) {
//           const decryptedData = decryptData(pair.encryptedData, pair.iv, user.encryptionKey);
//           decryptedImages.push(decryptedData.toString('base64'))
//           //decryptedImages.push(decryptedData);
//       }
//       res.status(200).json(decryptedImages); // Return array of image data
//   } catch (error) {
//       console.error('Error decrypting data from the database:', error);
//       res.status(500).send('Error decrypting data from the database');
//   }
// });

// module.exports = router;
