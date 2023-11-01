let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router();
let moviesSchema = require('../Models/Movies');

router.route('/').post((req, res, next) => {
  loginSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      console.log(data)
      res.json(data)
    }
  })
});




module.exports = router;