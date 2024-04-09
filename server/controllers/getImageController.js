// controllers/imageController.js

const axios = require("axios");
const UserModel = require("../models/User");
const { decryptData } = require("../utils/decryption");

const PINATA_GATEWAY_URL = "https://gateway.pinata.cloud/ipfs/";

async function getAllImages(req, res) {
    try {
        const userId = req.accountAddress;
        const user = await UserModel.findOne({ userId: userId });

        if (!user) {
            throw new Error('User not found with ID: ' + userId);
        }

        // Validate req.body to ensure it's an array
        if (!Array.isArray(req.body)) {
            throw new Error('req.body is not an array');
        }

        const { page, limit } = req.query;
        const pageNumber = parseInt(page) || 1; // Convert page to number, default to 1
        const limitNumber = parseInt(limit) || 1; // Convert limit to number, default to 1

        if (pageNumber < 1 || limitNumber < 1) {
            throw new Error('Invalid pagination parameters');
        }

        // Calculate start and end indices for slicing
        const startIndex = (pageNumber - 1) * limitNumber;
        const endIndex = pageNumber * limitNumber;

        // Ensure endIndex does not exceed the length of the array
        const ipfsHashesArray = req.body.slice(startIndex, Math.min(endIndex, req.body.length));

        const decryptedImages = [];

        if (ipfsHashesArray.length !== 0) {
            const encryptedDataArr = await Promise.all(ipfsHashesArray.map(async (ipfsHash) => {
                const response = await returnResponse(ipfsHash);
                return response;
            }));
            // Iterate over each pair of encryptedData and iv, decrypt them, and store in decryptedImages
            for (const pair of encryptedDataArr) {
                const decryptedData = decryptData(pair.encryptedData, pair.iv, user.encryptionKey);
                decryptedImages.push(decryptedData.toString('base64'));
            }
        }

        res.status(200).json({ message: "Image Sent", decryptedImages });
    } catch (error) {
        console.error('Error decrypting data from the database:', error);
        res.status(500).send('Error decrypting data from the database');
    }
}

async function returnResponse(ipfsHash) {
    const res = await axios.get(`${PINATA_GATEWAY_URL}${ipfsHash}`);
    return res.data;
}

module.exports = {
    getAllImages
};
