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
  review:
    
}, {
    collection: 'profiles'
  })
module.exports = mongoose.model('Prof', profSchema)