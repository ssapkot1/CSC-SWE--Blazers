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
      type: Number,
      validate: {
        validator: function(value) {
          return value >= 1 && value <= 5; // Define your range here
        },
        message: props => `${props.value} is not within the specified range (10 - 100).`,
      },
    }
  }

}, {
    collection: 'profiles'
  })
module.exports = mongoose.model('Prof', profSchema)