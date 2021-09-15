require("dotenv/config")
const Joi=require('joi')
const config = require('config')
Joi.objectId=require('joi-objectid')(Joi) //doubt
const mongoose=require('mongoose')
const users=require('./routes/users')
const changePassword =require('./routes/changePassword')
const auth=require('./routes/auth')
const express=require('express')
const app=express() //doubt

let validator = require("express-joi-validation").createValidator({
    passError: true,
  });

  if (!config.get('PrivateKey')) {
    console.error('FATAL ERROR: PrivateKey is not defined.');
    process.exit(1);
}



const url ="mongodb+srv://Shanmugapriya:ShanLogu@cluster0.0kydp.mongodb.net/Login-form?retryWrites=true&w=majority"

 //or //process.env.mongoose_url
connectionParams={
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true 
}




mongoose.connect(url,connectionParams)
.then(() =>console.log('connected to mongodb!'))
.catch(err =>console.error('something went wrong',err))


app.use(express.json())
app.use('/api/users',users)
app.use('/api/changePassword',changePassword)
app.use('/api/auth',auth)





const port=process.env.PORT|| 5000
app.listen(port, () => console.log(`running ${port}...`))

//mongoose_url="mongodb+srv://Shanmugapriya:ShanLogu@cluster0.0kydp.mongodb.net/Login-form?retryWrites=true&w=majority"