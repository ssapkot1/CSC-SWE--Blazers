let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router();
//movie Model
let moviesSchema = require('../Models/Movies');
// CREATE movie
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
// READ movies
router.route('/').get((req, res) => {
  moviesSchema.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});
// Update movie
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
// Delete movie
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
module.exports = router;