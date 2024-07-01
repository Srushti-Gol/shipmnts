const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const apiRoutes = require('./routes/api');
require('dotenv').config();

const app = express();

// Connect to database
connectDB();

// Enable CORS
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
