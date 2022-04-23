const mongoose = require('mongoose')

const subscriberSchema = new mongoose.Schema({
  UserID: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
  
})

module.exports = mongoose.model('User', subscriberSchema)