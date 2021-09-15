const { string, number } = require('joi')
const Joi=require('joi')
const mongoose=require('mongoose')

const User=mongoose.model('User',new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:20
    },
    email:{
        type:String,
        required:true,
        minlength:5,
        maxlength:20,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:5,
        maxlength:200
    },
    number:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,

    },
    pincode:{
        type:String,
        required:true,
        minlength:5,
        maxlength:10
    },
    landmark:{
        type:String,
        required:true,

    },
    city:{
        type:String,
        required:true
    },
    State:{
        type:String,
        required:true
    },
    type_of_place:{
        type:String,
        required:true
    },

}))

function validateUser(user){
    const schema=Joi.object({
        name:Joi.string().min(5).max(20).required(),
        email:Joi.string().min(5).max(20).required().email(),
        password:Joi.string().min(5).max(200).required(),
        number:Joi.string().required(),
        address:Joi.string().required(),
        pincode:Joi.string().required(),
        landmark:Joi.string().required(),
        city:Joi.string().required(),
        State:Joi.string().required(),
        type_of_place:Joi.string().required()
    })
    return schema.validate(user)

    
}
exports.User= User
exports.validate= validateUser

