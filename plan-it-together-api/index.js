require('dotenv').config(); // Load environment variables
const express = require("express");
const cors = require('cors');
const helmet = require('helmet'); // Adds security headers
const rateLimit = require('express-rate-limit'); // Prevents brute force attacks
const { connectDB } = require("./db");

const app = express();

// Secure database connection
connectDB();

// Enable CORS with security improvements
app.use(cors({
    origin: process.env.FRONT_URL, // Only allow the frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Limit allowed HTTP methods
    credentials: true, // Allow sending cookies within CORS
    allowedHeaders: ['Content-Type', 'Authorization'] // Restrict allowed headers
}));

// Add security headers using Helmet
app.use(helmet());

// Implement rate limiting to prevent brute force attacks
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Allow just 100 requests per IP per window
    standardHeaders: true, // Send rate limit information in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the deprecated `X-RateLimit-*` headers
});
app.use(limiter);

// Parse JSON payloads securely
app.use(express.json({ limit: '10kb' })); // Limit request body size

// Test route (specific, low-risk)
app.get('/asdf', (req, res) => {
    res.send('Success! GET request received.');
});

// Start server with added error handling
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
    console.log(`Server running securely on port ${PORT}`)
);

// Global error handler (Optional)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});