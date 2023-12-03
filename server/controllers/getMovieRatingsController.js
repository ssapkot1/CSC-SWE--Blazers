const UserRating = require('../Models/Rating');
const Movie = require('../Models/Movies');
const User = require('../Models/User');
const { ObjectId } = require('mongodb');

exports.getMovieRatings = async (req, res) => {
  try {
    const movieId = req.params.movieId;
    try {
        const result = await UserRating.aggregate([
          {
            $unwind: "$ratings"
          },
          {
            $match: { "ratings.movie" : ObjectId(movieId)}
          },
          {
            $project: {
              userId: "$user",
              rating: "$ratings.rating"
            }
          }
        ]);
        console.log(result);

        for (let i=0; i<result.length; i++) {
            var userId = result[i].userId;
            const user = await User.findById(userId);
            result[i]["email"] = user.email;
        }
        res.status(200).json({ message: result });
      } catch (err) {
        console.error(err);
        throw err;
      }
  } catch (error) {
    console.error('Error in rateMovie:', error);
    res.status(500).json({ message: error });
  }
};
