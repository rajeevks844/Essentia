const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from the .env file
dotenv.config();

// Initialize the Express app
const app = express();

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // For handling JSON form submissions

// Serve static files from the root directory (including success.html and error.html)
app.use(express.static(__dirname)); // Serve static files from the root directory

// POST route to handle form submission
app.post('/submit-form', async (req, res) => {
  const formData = req.body;

  try {
    // Send the form data to Web3Forms API, including the access key from the environment variables
    const response = await axios.post('https://api.web3forms.com/submit', {
      access_key: process.env.ACCESS_KEY, // Securely using the access key from .env
      ...formData
    });

    // Redirect to the success page if the submission was successful
    return res.redirect('/success.html');
  } catch (error) {
    console.error('Error submitting the form:', error.response ? error.response.data : error.message);

    // Redirect to the error page if an error occurs
    return res.redirect('/error.html');
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
