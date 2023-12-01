// controllers/ratingController.js
const UserRating = require('../Models/Rating'); // Assuming UserRating is the model with user and ratings array
const Movie = require('../Models/Movies');

exports.getRatingsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    var result = await UserRating.find({user: userId });
    res.json({ message: result });
  } catch (error) {
    console.error('Error in rateMovie:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
