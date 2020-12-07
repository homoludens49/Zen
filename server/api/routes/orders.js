const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')

const Order = require('../models/order');
// const ManualOrder = require('../models/order');
const Product = require('../models/product');


router.get('/', (req,res)=>{ 
    Order.find({}).then(function(orders){
        res.send(orders);
    })
})

router.post('/', (req,res,next)=>{
    console.log(req)
    const sku = req.body.sku
    const orderQuant = req.body.quantity
    const order = new ManualOrder({
        _id: new mongoose.Types.ObjectId(),
        orderId: req.body.orderId,
        sku: req.body.sku,
        quantity: req.body.quantity
    });
    order.save()
    Product.update({sku:sku, "warehouse": "Omniva"},
        {$inc:{quantity:-orderQuant}}
        ).then(function(product){
        console.log(product)
    })
    .then(result =>{
        console.log(result);
        res.status(201).json({
            message: 'Created object in /products'
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err})
    });
});


module.exports = router;