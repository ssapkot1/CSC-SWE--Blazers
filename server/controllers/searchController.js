const Movie = require('../models/Movies'); // Ensure the path to your Movie model is correct

exports.searchMovies = async (req, res) => {
  try {
    const searchTerm = req.query.term;

    if (!searchTerm.trim()) { // Check if the search term is empty or just whitespace
      return res.json([]); // Return an empty array
    }

    const searchResult = await Movie.find({
      title: { $regex: new RegExp(searchTerm, 'i') }
    });

    res.json(searchResult);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ message: 'Server Error during movie search' });
  }
};
