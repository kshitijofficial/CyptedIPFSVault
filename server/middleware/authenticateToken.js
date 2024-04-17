const jwt = require('jsonwebtoken')
// const {JWT_SECRET}=require('../config/serverConfig')

const authenticateToken = async(req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) return res.json({ message: "Authentication Failed!!!" });
    try {
        const decoded = jwt.verify(token,'secretKey')
   
        req.accountAddress = decoded.address; // Attach decoded.accountAddress to the req object
        next(); // Call next to pass control to the next middleware/route handler
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            // Token has expired, send an error response
            return res.status(401).json({ message: 'Token expired' });
        } else {
            // Other JWT verification errors
            return res.status(401).json({ message: 'Invalid token' });
        }
    }
}

module.exports = { authenticateToken };