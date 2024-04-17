// controllers/authController.js

const ethers = require('ethers');
const jwt = require('jsonwebtoken');
// const {JWT_SECRET}=require('../config/serverConfig')
const UserModel = require('../models/User')

async function authenticate(req, res, next) {
    try {
        const { signature } = req.body;
        const { accountAddress } = req.query;
       
        if (!signature) {
            return res.status(400).json({ message: 'Missing signature or account address'  });
        }

        const recoveredAddress = ethers.utils.verifyMessage("Authentication message", signature);
        
        if (accountAddress.toLowerCase() === recoveredAddress.toLowerCase()) {
            const address = recoveredAddress.toLowerCase();
            let user = await UserModel.findOne({ userId: address });
            if (!user) {
                user = await UserModel.create({
                    userId: address,
                });
            }
            const token  = jwt.sign({
                address
            },'secretKey') 
            return res.status(200).json({ authenticated: true,message: "Authentication Successfull!", token });
        } else {
            return res.status(404).json({ authenticated: false, message: 'Authentication Failed!' });
        }
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = {
    authenticate
};
