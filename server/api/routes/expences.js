const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const cors = require('cors');
const Expences = require ('../models/expences')
router.use(cors());



router.get('/', (req,res)=>{ 
    Expences.find({}).then(function(expences){
        res.send(expences);
    })
    console.log('bash message')
})

router.post('/', (req,res,next)=>{
    const expence = new Expences({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        vat: req.body.vat,
        month: req.body.month,
        year: req.body.year,
        cost: req.body.cost,
    });
    expence
    .save()
    .then(result =>{
        console.log(result);
        res.status(201).json({
            message: 'Created object in /expence'
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err})
    });
});
//





module.exports = router;