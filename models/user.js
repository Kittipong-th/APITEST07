const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  userID: {
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
//สร้างโมเดล
let Users = mongoose.model("User",userSchema)

//ส่งออกโมเดล
module.exports = Users