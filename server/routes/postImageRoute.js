const express = require('express');
const router = express.Router();
const multiConfig = require("../config/multiConfig");
const { authenticateToken } = require('../middleware/authenticateToken');
const { uploadImage } = require('../controllers/postImageController');

router.post("/uploadImage", authenticateToken, multiConfig.uploadUserImage, uploadImage);

module.exports = router;


// require('dotenv').config()
// const express = require('express');
// const router = express.Router();
// const multiConfig = require("../multiConfig/multiConfig");
// const { encryptFile } = require("../utils/encryption");
// const { generateEncryptionKey } = require("../utils/generateKey");
// const UserModel = require("../models/User");
// const pinataSDK = require('@pinata/sdk');
// const { authenticateToken } = require('../middleware/authentication');

// const pinata = new pinataSDK({ pinataApiKey: process.env.PINATA_API_KEY, pinataSecretApiKey: process.env.PINATA_SECERET_KEY });

// router.post("/uploadImage",authenticateToken, multiConfig.uploadUserImage, async (req, res) => {
//     try {
//         const userId = req.accountAddress;
//         const user = await UserModel.findOne({ userId: userId });
//         if (Object.keys(user).length === 0) {
//             const encryptionKey = generateEncryptionKey(32);
//             await UserModel.create({
//                 userId,
//                 encryptionKey
//             });
//         }
//         const encryptionKey = user.encryptionKey;
//         const { encryptedData, iv } = encryptFile(req.file.buffer, encryptionKey);
//         const resPinata = await pinata.pinJSONToIPFS({ encryptedData, iv })
//         res.status(200).json({message:"Upload Successfule!!!",ipfsHash:resPinata.IpfsHash});
//     } catch (error) {
//         res.status(500).json({message:"Internal server error!"})
//     }
    
// });

// module.exports = router;
