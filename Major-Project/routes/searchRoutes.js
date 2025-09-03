// Import necessary modules
const express = require('express');
const router = express.Router(); // Create a new router instance
const Listing = require('../models/listing');

// GET route for search functionality
router.get('/listings/search', async (req, res) => {
  try {
    // Extract the search query from the request parameters
    const query = req.query.query;

    // Perform the search query on your database
    const searchResults = await Listing.find({
      $or: [
        { title: { $regex: query, $options: 'i' } }, // Case-insensitive search in the title
        { description: { $regex: query, $options: 'i' } }, // Case-insensitive search in the description
      ]
    });

    // Render the search results page with the search results
    res.render('listings/search-results', { searchResults });
  } catch (err) {
    // Handle errors
    console.error('Error searching listings:', err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router; // Export the router object
