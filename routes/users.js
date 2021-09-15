const bcrypt=require('bcrypt') //bcrypt package //encrypt the password before saving into the database using bcrypt package
const{User,validate}=require('../models/user')
const express=require('express')
const router=express.Router();
 
router.post('/',async(req,res)=>{ //to add new users
    //first validate the request
    const{error}=validate(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)

    }
    //Check if the user already exisits
    let user=await User.findOne({email:req.body.email})
    if(user){
        return res.status(400).send('User already exist!')

    } else {
        //insert the new user if they do not exist yet
        user=new User({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            number:req.body.number,
            address:req.body.address,
            pincode:req.body.pincode,
            landmark:req.body.landmark,
            city:req.body.city,
            State:req.body.State,
            type_of_place:req.body.type_of_place
            
        })
        const salt=await bcrypt.genSalt(10)
        user.password=await bcrypt.hash(user.password,salt)
        await user.save()
        res.send(user)
    }
})
router.get('/',async(req,res)=>{  //to get the users data,particular data means :_id,findById,({_id:req.params._id})
    try{
        
        const user=await User.find() //fetching data from a server i.e(all users)-simply give find() or if you want find the particular user,mention the id in the url and findbyid in source code then '/:id'
        res.json(user)

    }catch(err){
        res.send('Error'+err)
    }
})

router.delete('/:_id',async(req,res)=>{  //to get the users data,particular data means :_id,findById,({_id:req.params._id})
    try{
        
        const user=await User.findByIdAndDelete({_id:req.params._id}) //fetching data from a server i.e(all users)-simply give find() or if you want find the particular user,mention the id in the url and findbyid in source code then '/:id'
        //res.json(user)
        return res.status(400).send('User deleted successfully')

    }catch(err){
        res.send('Error'+err)
        
    }
})




module.exports=router

/*{
    "name":"Ramya",
    "email":"ramya@gmail.com",
    "password":"Ramya",
    "number":"9941269063",
    "address":"No:3,washermanpet",
    "pincode":"600021",
    "landmark":"metro",
    "city":"Salem",
    "State":"TamilNadu",
    "type_of_place":"City"
                
    }*/