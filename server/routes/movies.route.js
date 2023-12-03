let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router();
  const recommendationController = require('../controllers/recommendationController');


let moviesSchema = require('../Models/Movies');

router.route('/add-movie').post((req, res, next) => {
  moviesSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      console.log(data)
      res.json(data)
    }
  })
});

router.route('/').get((req, res) => {
  moviesSchema.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

router.route('/update-movie/:id').put((req, res, next) => {
  moviesSchema.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('movie updated successfully !')
    }
  })
})

router.route('/delete-movie/:id').delete((req, res, next) => {
  moviesSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

router.route('/random').get((req, res, next) => {
  moviesSchema.aggregate([
    { $sample: { size: 1 } }
  ]).exec((error, data) => {
    if (error) {
      return next(error);
    } else {
      if (data.length) {
        res.json(data[0]); 
      } else {
        res.status(404).json({ msg: 'No movies found' });
      }
    }
  });
});

router.route('/recommendation').get(recommendationController.getMovieRecommendation);



router.get('/details/:id', async (req, res) => {
  try {
    const movie = await moviesSchema.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ msg: 'Movie not found' });
    }
    res.json(movie);
  } catch (error) {
    console.error('Error fetching movie details:', error);
    res.status(500).send('Server error');
  }
});

module.exports = router;