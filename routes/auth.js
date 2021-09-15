const config = require('config')
const jwt = require('jsonwebtoken')
const Joi = require('joi');
const bcrypt = require('bcrypt');
const { User } = require('../models/user');
const express = require('express');
const router = express.Router();
require('dotenv').config()

router.post('/', async (req, res) => {
    // First Validate The HTTP Request
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    //  Now find the user by their email address
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).send('that user already exist');
    } else { 

    /*// Then validate the Credentials in MongoDB match
    // those provided in the request
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(400).send('Incorrect email or password.');
    }
    //const token=jwt.sign({_id: user._id},'PrivateKey')
   // res.send(token)
//})

    const accessToken = jwt.sign({_id:user._id}, process.env.ACCESS_TOKEN_SECRET);
    console.log(accessToken)
    let op = {accessToken :accessToken,success:1,message:"loggin successfully"};
     //if(!op) return res.status(400).json({status:400,message:"error"})
    res.send(op);
    console.log(op);
    
})*/
    

   /* user = new User(_.pick(req.body, ['name', 'email', 'password','number','address','pincode','landmark','city','state','type_of_place']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    
    const token = jwt.sign({ _id: user._id }, config.get('PrivateKey'))
    //res.send(token)
//})
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']))*/
    const accessToken = jwt.sign({_id:user._id}, process.env.ACCESS_TOKEN_SECRET);
    console.log(accessToken)
    let op = {accessToken :accessToken,success:1,message:"loggin successfully"};
     if(!op) return res.status(400).json({status:400,message:"error"})
    res.send(op);
    console.log(op);
   
   }
})

function validate(req) {
    const schema = Joi.object().keys({
      email : Joi.string().required(), 
      password :Joi.string().min(5).max(1024).required(),
         
       
    });
    return schema.validate(req);
      
  }





module.exports = router
