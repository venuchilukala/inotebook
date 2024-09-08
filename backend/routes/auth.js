const express = require('express');
const { default: mongoose } = require('mongoose');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');
const {body, validationResult} = require('express-validator');
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'iamagood$boy'

//Route:1 ----creating user using POST api/auth/createuser and no login is required
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
        res.status(500).send('Internal Server Error');
    }
})

//Route:2 -----Authenticating a user using POST api/auth/login and no login is required
router.post('/login',[
    body('email','Enter valid Email').isEmail(),
    body('password','Password cannot be blank').exists(),
],
async (req, res) =>{
    //If there are errors return bad request and errors
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error : error.array()})
    }
    const {email, password} = req.body;
    
    try{
        let user = await User.findOne({email});
        
        if(!user){
            return res.status(400).json({error : "Please try to login with correct credentials"});
        }
        
        const passwordCompare = await bcrypt.compare(password, user.password);
        
        if(!passwordCompare){
            return res.status(400).json({error : "Please try to login with correct credentials"});
        }
        
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
        res.status(500).send('Internal Server Error');
    }   
})

//Route:3 -----Getting a user details using: POST "api/auth/getuser" and login is required
router.post('/getuser',fetchuser, async (req, res) =>{
    try{
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    }catch(error){
            console.error(error.message);
            res.status(500).send('Internal Server Error');
    }
})

module.exports = router;