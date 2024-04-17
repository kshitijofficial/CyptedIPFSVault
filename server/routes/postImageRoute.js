const express = require('express');
const router = express.Router();
const multiConfig = require("../config/multiConfig");
const { authenticateToken } = require('../middleware/authenticateToken');
const { uploadImage } = require('../controllers/postImageController');

router.post("/uploadImage", authenticateToken, multiConfig.uploadUserImage, uploadImage);

module.exports = router;
