const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const productRoutes = require('./routes/Products'); // Import product routes

const app = express();

// Middleware for parsing request body and serving static files
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// MongoDB connection with proper error handling
const DB_URI = 'mongodb://127.0.0.1:27017/beautyB';
mongoose
    .connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB successfully.');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1); // Exit the application if the connection fails
    });

<<<<<<< HEAD
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
=======
app.use('/',productRoutes);
    
    // Start the server
app.listen(3000, () => {
        console.log('Server running on port 3000')});

//himanshuu
>>>>>>> d66341d544659a9fb4769f1d42ead85dfd369b46
