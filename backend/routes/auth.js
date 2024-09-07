const express = require('express');
const { default: mongoose } = require('mongoose');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');
const {body, validationResult} = require('express-validator');
var jwt = require('jsonwebtoken');

const JWT_SECRET = 'iamagood$boy'
//creating user using POST and no login is required
router.post('/createUser',[
    body('name','Enter Valid Name').isLength({min : 3}),
    body('email','Enter valid Email').isEmail(),
    body('password','Enter valid Password').isLength({min : 5}),
],
async (req, res)=>{
    //If there are errors return bad request and errors
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error : error.array()})
    }
    try{
    // check whether the user exists already
    let user = await User.findOne({email : req.body.email})
    if(user){
        return res.status(400).json({error : 'Sorry user with this email already exists'});
    }
    const salt = await bcrypt.genSalt(10);

    const secPass = await bcrypt.hash(req.body.password,salt);
    //create a user
    user = await User.create({
        name : req.body.name,
        email : req.body.email,
        password : secPass,
    })

    const data = {
        user : {
            id : user.id
        }
    }

    const authtoken = jwt.sign(data, JWT_SECRET)
    // console.log(jwtData)
  
    res.json({authtoken})

    }catch(error){
        console.error(error.message);
        res.status(500).send('some error occured');
    }
})


module.exports = router;