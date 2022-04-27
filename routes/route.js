const express = require('express')
const router = express.Router()

//เรียกใช้งานโมเดล
const User = require('../models/user')

//hash password
const bcrypt = require('bcrypt')


//middleware
const isLoggedIn = (req, res, next) => {
    if (!req.session.user) {
    return res.redirect('/login');
    }
    next()
}

  
//index
router.get('/',isLoggedIn,(req,res)=>{
    res.render('index',{user:req.session.user})
})


//create user
router.post('/register', async (req, res) => {
    const {userID,password,name,elec_use,myroom,roomate,Status,image} = req.body
    const passwordHash = bcrypt.hashSync(password,10);
    const user = new User({
        userID, 
        password : passwordHash,
        name,
        myroom,
        elec_use,
        roomate,
        Status,
        image
    })
    
    try {
        const newUser = await user.save()
        res.status(201).json(newUser)
        }catch (err) {
        res.status(400).json({ message: err.message })
        }
})


//login
router.get('/login',(req,res)=>{
    res.render('login')
})

//login post
router.post('/login',async (req, res) => {
    const{userID,password} = req.body
    const user = await User.findOne({
        userID
      
    })
    console.log(userID)
    console.log(password)

    if (user){
        const isCorrect = bcrypt.compareSync(password,user.password) 
        if(isCorrect){
            req.session.user = user
            return res.render('index',{user})
        }
    }else{
        return res.render('login')
    }
})


router.get('/repass',(req,res)=>{
    res.render('repassword')
})

router.post('/repass',async (req,res) => {
    const email = req.body.email
    const user = await User.findOne({
        userID : email
    })
    if(user){ 
        req.user = user
        return res.render('repassword-end',{user})
    }else{
        return res.render('repassword')
    }
})


router.get('/repass-end',(req,res)=>{
    res.render('repassword-end',{user})

})


router.post('/repass-end',async (req,res) => {
    const repass = req.body.new_password
    const repass1 = req.body.new_password1
    const Updatepass = await User.findOne({
        _id : req.body.update_id,
        password : req.body.password
    })
   
    if(Updatepass){
        if(repass == repass1){
            const update = {
                password:repass
            }
            User.findByIdAndUpdate(req.body.update_id,update,{userFindAndModify:false}).exec(err=>{
                res.redirect('/repass-sucess')
            })
        
        }else{
            console.log("password not same")
        }
    }else{
        console.log("Password inccorrect")
    }
   
})

router.get('/repass-sucess',(req,res)=>{
    res.render('repassword-sucess')
})

router.get('/navbar',(req,res)=>{
    res.render('navbar',{user:req.session.user})
})

//views  
router.get('/elec_bills',isLoggedIn,(req,res)=>{
    res.render('elec-bills',{user:req.session.user})
})

router.get('/elec_payment',isLoggedIn,(req,res)=>{
    res.render('elec-payment',{user:req.session.user})
})

router.get('/elec_payment_ktb',isLoggedIn,(req,res)=>{
    res.render('elec-bills_krungthai',{user:req.session.user})
})

router.get('/elec_payment_ktb1',isLoggedIn,(req,res)=>{
    res.render('elec-bills_krungthai_1',{user:req.session.user})
})


router.get('/elec_payment_ktb2',isLoggedIn,(req,res)=>{
    res.render('elec-bills_krungthai_2',{user:req.session.user})
})

router.get('/elec_payment_ktp',isLoggedIn,(req,res)=>{
    res.render('elec-bills_krungthep',{user:req.session.user})
})

router.get('/elec_payment_ktp1',isLoggedIn,(req,res)=>{
    res.render('elec-bills_krungthep_1',{user:req.session.user})
})

router.get('/elec_payment_ktp2',isLoggedIn,(req,res)=>{
    res.render('elec-bills_krungthep_2',{user:req.session.user})
})

router.get('/elec_payment_scb',isLoggedIn,(req,res)=>{
    res.render('elec-bills_thaipanich',{user:req.session.user})
})

router.get('/elec_payment_scb1',isLoggedIn,(req,res)=>{
    res.render('elec-bills_thaipanich_1',{user:req.session.user})
})

router.get('/elec_payment_scb2',isLoggedIn,(req,res)=>{
    res.render('elec-bills_thaipanich_2',{user:req.session.user})
})

router.get('/logout',(req,res)=>{
    req.session = null
    res.redirect('/login')
})

module.exports = router