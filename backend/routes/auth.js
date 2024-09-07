const express = require('express');
const { default: mongoose } = require('mongoose');
const User = require('../models/User')
const router = express.Router();
const {body, validationResult} = require('express-validator')

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
    //create a user
    user = await User.create({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password,
    })
    // .then(user => res.json(user))
    // .catch(err => {console.log(err) 
    // res.json({error : 'Please enter a unique value for email', message : err.message})});
    res.json({user})
    }catch(error){
        console.error(error.message);
        res.status(500).send('some error occured');
    }
})


module.exports = router;