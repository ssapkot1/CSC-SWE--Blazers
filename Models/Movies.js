const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let moviesSchema = new Schema({
  id : {
    type: String
  },
  title: {
    type: String
  },
  genre: {
    type: String
  },
  
   
 

}, {
    collection: 'movies'
  })
module.exports = mongoose.model('Movies', moviesSchema)