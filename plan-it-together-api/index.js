const express = require("express");
const { connectDB } = require("./db");
const cors = require('cors');

const app = express();
connectDB();

app.use(cors({
    origin: process.env.FRONT_URL, // Înlocuiește cu URL-ul frontend-ului tău
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.get('/asdf', (req, res) => {
    res.send('Success! GET request received.');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
