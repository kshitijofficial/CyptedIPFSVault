
const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authenticateToken');
const { getAllImages } = require('../controllers/getImageController');

router.post("/getAllImages",authenticateToken,getAllImages);

module.exports = router;
