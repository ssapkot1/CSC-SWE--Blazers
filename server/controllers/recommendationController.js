const Movie = require('../Models/Movies'); 
const Rating = require('../Models/Rating'); 
const axios = require('axios');
require('dotenv').config();
exports.getMovieRecommendation = async (req, res) => {
  try {
    const apiKey = process.env.API_KEY;
    const userId = req.params.userId;
   

    const response = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`);
    const moviesFromAPI = response.data.results;
    console.log(response);

    if (moviesFromAPI.length > 0) {
      const randomIndex = Math.floor(Math.random() * moviesFromAPI.length);
      const randomMovie = moviesFromAPI[randomIndex];
      res.json(randomMovie);
    } else {
      res.status(404).json({ message: 'No movies available.' });
    }

  } catch (error) {
    console.error('Error getting movie recommendation:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};