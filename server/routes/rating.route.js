
const express = require('express');
const { rateMovie } = require('../controllers/ratingController');
const { getRatingsByUser } = require('../controllers/getRatingsController');
const { getMovieRatings } = require('../controllers/getMovieRatingsController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, rateMovie);
router.get('/:userId', getRatingsByUser);
router.get('/movies/:movieId', getMovieRatings);

module.exports = router;