const UserRating = require('../Models/Rating');
const Movie = require('../Models/Movies');

exports.rateMovie = async (req, res) => {
  try {
    const { movieId, rating } = req.body;
    const userId = req.user.id;


    if (!movieId) {
      return res.status(400).json({ message: 'Movie ID is required.' });
    }

    const ratingValue = parseInt(rating, 10);
    if (isNaN(ratingValue)) {
      return res.status(400).json({ message: 'Rating must be a number.' });
    }

    if (ratingValue < 1 || ratingValue > 10) {
      return res.status(400).json({ message: 'Rating must be between 1 and 10.' });
    }

    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found.' });
    }


    const userRatingDoc = await UserRating.findOneAndUpdate(
      { user: userId },
      { $setOnInsert: { user: userId, ratings: [] } },
      { new: true, upsert: true }
    );

    const movieRatingIndex = userRatingDoc.ratings.findIndex(r => r.movie.equals(movieId));

    if (movieRatingIndex > -1) {

      userRatingDoc.ratings[movieRatingIndex].rating = ratingValue;
    } else {

      userRatingDoc.ratings.push({ movie: movieId, rating: ratingValue });
    }

    await userRatingDoc.save();

    res.json({ message: 'Rating saved successfully' });
  } catch (error) {
    console.error('Error in rateMovie:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
