const mongoose = require('mongoose')

const subscriberSchema = new mongoose.Schema({
  UserID: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  subscribeDate: {
    type: Date,
    required: true,
    default: Date.now
  }
})

module.exports = mongoose.model('User', subscriberSchema)