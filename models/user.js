
const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    userID:{
      type: String,
      unique: true,
      require: true
    },
    password:{
      type: String,
      require: true
    },
    name:{
      type: String,
      require: true
    },
    elec_use:{
      type: Number
    },
    myroom:{
      type: Number
    },
    roomate:{
      type: Number
    },
    Status:{
      type: Boolean
    },
    image :{
      type: String
    }
        
  })

//ส่งออกโมเดล
module.exports = mongoose.model("User",userSchema)