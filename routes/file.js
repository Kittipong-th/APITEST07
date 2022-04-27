const express = require('express')
const router = express.Router()

//เรียกใช้งานโมเดล
const User = require('../models/user')
const multer = require('multer')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/img/users')
    },
    filename: (req, file, cb) => {
        cb(null, 'file-' + Date.now() + '.' +
        file.originalname.split('.')[file.originalname.split('.').length-1])}
})
const upload = multer({ storage: storage })



//upload image and save in db
router.post('/upload',upload.single('ktb'),(req,res) => {
  console.log(req.file)
  const user_id = req.body.update_id
  const user = {
      image:req.file.filename
  }
  User.findByIdAndUpdate(user_id,user,{userFindAndModify:false}).exec(err=>{
        res.redirect('/elec_payment_ktb2')
  })
})

router.post('/upload-ktp',upload.single('ktp'),(req,res) => {
    console.log(req.file)
    const user_id = req.body.update_id
    const user = {
        image:req.file.filename
    }
    User.findByIdAndUpdate(user_id,user,{userFindAndModify:false}).exec(err=>{
        res.redirect('/elec_payment_ktp2')
    })
})
 
router.post('/upload-scb',upload.single('scb'),(req,res) => {
    console.log(req.file)
    const user_id = req.body.update_id
    const user = {
        image:req.file.filename
    }
    User.findByIdAndUpdate(user_id,user,{userFindAndModify:false}).exec(err=>{
        res.redirect('/elec_payment_scb2')
    })
})

module.exports = router