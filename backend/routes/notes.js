const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const {body, validationResult} = require('express-validator');


//Route : 1 - Get all the notes of user using GET: /api/notes/fetchallnotes Login required
router.get('/fetchallnotes', fetchuser ,async (req, res)=>{
    try{
        const notes = await Note.find({user : req.user.id});
        res.json(notes);
    }catch(error){
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
})

//Route : 2 - Add new noteu sing POST: /api/notes/addnote Login required
router.post('/addnote', fetchuser,[
    body('title','Enter Valid Title').isLength({min : 3}),
    body('description','Enter atleast min of 5 chars').isLength({min : 5}),
], async (req, res)=>{
    try{
        const {title, description, tag} = req.body;
        //If there are errors return bad request and errors
        const error = validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).json({error : error.array()})
        }
    
        const note = new Note({
            title, description, tag, user : req.user.id
        })
        const savedNote = await note.save()
    
        res.json(savedNote);
    }catch(error){
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
})

module.exports = router;