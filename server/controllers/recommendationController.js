// controllers/recommendationController.js
const Movie = require('../Models/Movies'); // Assuming this is the correct path
const Rating = require('../Models/Rating'); // Assuming this is the correct path

exports.getMovieRecommendation = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Get IDs of movies the user has already rated
    const ratedMovies = await Rating.find({ user: userId }).select('movie -_id');
    const ratedMovieIds = ratedMovies.map(r => r.movie);

    // Get a random movie that the user hasn't rated yet
    const query = Movie.find({ _id: { $nin: ratedMovieIds } });
    const count = await query.countDocuments();
    if (count === 0) {
      return res.status(404).json({ message: 'No more movies to rate.' });
    }
    const random = Math.floor(Math.random() * count);
    const randomMovie = await query.skip(random).limit(1);

    res.json(randomMovie);
  } catch (error) {
    console.error('Error getting movie recommendation:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
