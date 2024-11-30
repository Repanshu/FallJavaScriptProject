const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const productRoutes = require('./routes/Products');
// Import product routes

const app = express();

// Middleware for parsing request body and serving static files
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// MongoDB connection with proper error handling
mongoose.connect('mongodb://localhost:27017/beautyDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB', err);
    });

// Routing setup
app.use('/', productRoutes); // Mount product routes on the root path


// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack trace
  res.status(500).send('Something went wrong! Please try again later.'); // Friendly error message
});

// Start the server
const PORT = 3000; // Use environment variable for PORT or default to 3000
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
