const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const connectDB = require('./db/connect');
const { PORT, MONGO_URL } = require('./config/serverConfig');
const app = express();
const postImageRoute = require("./routes/postImageRoute");
const getImageRoute = require("./routes/getImageRoute");
const authenticate = require("./routes/authenticationRoutes");

// Middleware
app.use(cors());
app.use(express.json());
app.use(helmet()); // Helmet middleware for security headers

// Add routes after middleware setup
app.use('/api', authenticate);
app.use('/api', postImageRoute);
app.use('/api', getImageRoute);

// Centralized Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

async function startServer() {
    try {
        await connectDB(MONGO_URL);
        console.log("Connected to DB");

        // Start the server
        app.listen(PORT, () => {
            console.log(`Server is running at port: ${PORT}`);
        });
    } catch (error) {
        console.error("Error connecting to DB:", error);
        process.exit(1);
    }
}

// Start the server
startServer();
