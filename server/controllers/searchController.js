const Movie = require('../Models/Movies'); 

exports.searchMovies = async (req, res) => {
  try {
    const searchTerm = req.query.term;
    const searchResult = await Movie.find({
      title: { $regex: new RegExp(searchTerm, 'i') }
    });

    res.json(searchResult);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ message: 'Server Error during movie search' });
  }
};
