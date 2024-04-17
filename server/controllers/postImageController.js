require('dotenv').config()
const { encryptFile } = require("../utils/encryption");
const { generateEncryptionKey } = require("../utils/generateKey");
const UserModel = require("../models/User");
const pinataSDK = require('@pinata/sdk');
const pinata = new pinataSDK({ pinataApiKey: process.env.PINATA_API_KEY, pinataSecretApiKey: process.env.PINATA_SECERET_KEY });

async function uploadImage(req, res) {
    try {
        const userId = req.accountAddress;
        const user = await UserModel.findOne({ userId: userId });
        if (user.encryptionKey===null) {
            const encryptionKey = generateEncryptionKey(32);
            user.encryptionKey = encryptionKey;
            await user.save();
        }
        
        const encryptionKey = user.encryptionKey;
        const { encryptedData, iv } = encryptFile(req.file.buffer, encryptionKey);
        const resPinata = await pinata.pinJSONToIPFS({ encryptedData, iv });
        
        res.status(200).json({ message: "Upload Successful!!!", ipfsHash: resPinata.IpfsHash });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ message: "Internal server error!" });
    }
}

module.exports = {
    uploadImage
};