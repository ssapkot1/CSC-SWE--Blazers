// controllers/recommendationController.js
const Movie = require('../Models/Movies'); // Assuming this is the correct path
const Rating = require('../Models/Rating'); // Assuming this is the correct path
const axios = require('axios');
exports.getMovieRecommendation = async (req, res) => {
  try {
    const apiKey = 'cba3a67952cafc295156d92ceaa0b396';
    const userId = req.params.userId;
    // console.log(apiKey)

    // Get IDs of movies the user has already rated
    const ratedMovies = await Rating.find({ user: userId }).select('movie -_id');
    const ratedMovieIds = ratedMovies.map(r => r.movie);

    const response = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`);
    // const recommendedMovies = response.data.results;
    // console.log(recommendedMovies)
    const moviesFromAPI = response.data.results;
    console.log(response.data.results)
    const recommendedMovies = moviesFromAPI.filter(movie => !ratedMovieIds.includes(movie.id));

    // Get a random movie that the user hasn't rated yet
    // const query = Movie.find({ _id: { $nin: ratedMovieIds } });
    // const count = await query.countDocuments();
    // if (count === 0) {
    //   return res.status(404).json({ message: 'No more movies to rate.' });
    // }
    // const random = Math.floor(Math.random() * count);
    // const randomMovie = await query.skip(random).limit(1);

    // res.json(randomMovie);
    res.json(recommendedMovies);
  } catch (error) {
    console.error('Error getting movie recommendation:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
