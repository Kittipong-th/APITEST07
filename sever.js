require('dotenv').config();
const express = require('express')
const path = require('path')
const session = require('express-session');
const router = require('./routes/route')
const app = express()
const mongoose = require('mongoose')


mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open',() => console.log('Connected to Database'))


app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.use(
  session({
    secret: 'my_super_secret$%@#$#fsdfqew',
    resave: false,
    saveUninitialized: false
  })
)
app.use(router)

//เอาค่าstatic ของเว็บมาใช้พวก css img
app.use(express.static(path.join(__dirname,'public')))
app.listen(3000,()=>{
    console.log('รันsever port 3000')
})