const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let profSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  userID: {
    type: String
  },
  reviews: { 
    type: Array,
    items : {
      type: String,
      type: Int32(5)
    }
  }

}, {
    collection: 'profiles'
  })
module.exports = mongoose.model('Prof', profSchema)