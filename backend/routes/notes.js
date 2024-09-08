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

//Route : 3 - update the note using PUT: /api/notes/updatenote/:id Login required
router.put('/updatenote/:id', fetchuser, async (req, res)=>{
    const {title, description, tag} = req.body;
    try{
    //create a new note object
    const newNote ={};
    if(title){newNote.title = title}
    if(description){newNote.description = description}
    if(tag){newNote.tag = tag}

    //Find the note to be updated and update it
    let note = await  Note.findById(req.params.id);
    if(!note){res.status(401).send("Not Found")}
    
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndUpdate(req.params.id, {$set : newNote}, {new : true})
    res.json({note})   
    }catch(error){
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
})

//Route : 4 - Delete the note using DELETE: /api/notes/deletenote/:id Login required
router.delete('/deletenote/:id', fetchuser, async (req, res)=>{
    try{
    //Find the note to be deleted and delete it
    let note = await  Note.findById(req.params.id);
    if(!note){res.status(401).send("Not Found")}
    
    //Allow user if he owns the note
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id)
    res.json({"Success" : "Note has been deleted successfully", note : note})   
    }catch(error){
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
})

module.exports = router;