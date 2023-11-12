// controllers/movieController.js

// This function is just a placeholder.
// You would replace this with your actual recommendation logic.
const getMovieRecommendation = async (userId) => {
    // Find all movies that the user has not rated yet
    const ratedMovies = await Rating.find({ user: userId }).select('movie');
    const ratedMovieIds = ratedMovies.map(r => r.movie);
    const notRatedMovies = await Movie.find({ _id: { $nin: ratedMovieIds } });
  
    // Select a random movie from those that have not been rated by the user
    const recommendation = notRatedMovies[Math.floor(Math.random() * notRatedMovies.length)];
    return recommendation;
  };
  
  // Add to your movie routes file
  router.get('/recommendation', authMiddleware, async (req, res) => {
    try {
      const userId = req.user.id; // Get user ID from the auth middleware
      const recommendation = await getMovieRecommendation(userId);
      if (!recommendation) {
        return res.status(404).json({ message: 'No recommendation found.' });
      }
      res.json(recommendation);
    } catch (error) {
      console.error('Error getting movie recommendation:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  