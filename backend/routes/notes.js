const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();

router.get('/', (req, res)=>{
    res.json([])
})

module.exports = router;