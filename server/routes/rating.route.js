// routes/ratingRoutes.js
const express = require('express');
const { rateMovie } = require('../controllers/ratingController');
const { getRatingsByUser } = require('../controllers/getRatingsController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, rateMovie);
router.get('/:userId', getRatingsByUser);

module.exports = router;