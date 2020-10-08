const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')

const Order = require('../models/order');
const Product = require('../models/product');



//Find by specific criteria and perform math operation on it
router.get('/totalItems', (req,res)=>{ 
    Product.aggregate([
        {$match:{"warehouse": {$regex : ".*.*"}}},
        {
            $group: 
            {"_id": "", "quantity": {$sum : "$quantity"},
            "sellprice": {$sum : { $multiply: [ "$sellprice", "$quantity" ] }},
            "buyprice": {$sum : { $multiply: [ "$buyprice", "$quantity" ] }},
            "revenueNoVat": {$sum : {$divide: [{ $multiply: [ "$sellprice", "$quantity" ] }, 1.21]}}
            },  
        },
        
        ]
        ).then(function(sumbyWarehouse){
        console.log(sumbyWarehouse)
        const result = JSON.stringify(sumbyWarehouse)
        console.log(result)
        res.send(result);
    })
})
router.get('/totalItemsOmniva', (req,res)=>{ 
    Product.aggregate([
        {$match:{"warehouse": {$regex : ".*Omn.*"}}},
        {
            $group: 
            {"_id": "", "quantity": {$sum : "$quantity"},
            "sellprice": {$sum : { $multiply: [ "$sellprice", "$quantity" ] }},
            "buyprice": {$sum : { $multiply: [ "$buyprice", "$quantity" ] }},
            "revenueNoVat": {$sum : {$divide: [{ $multiply: [ "$sellprice", "$quantity" ] }, 1.21]}}
        }}
        ]
        ).then(function(sumOmn){
        console.log(sumOmn)
        const result = JSON.stringify(sumOmn)
        console.log(result)
        res.send(result);
    })
})
router.get('/totalItemsMain', (req,res)=>{ 
    Product.aggregate([
        {$match:{"warehouse": {$regex : ".*Ganibu.*"}}},
        {
            $group: 
            {"_id": "", "quantity": {$sum : "$quantity"},
            "sellprice": {$sum : { $multiply: [ "$sellprice", "$quantity" ] }},
            "buyprice": {$sum : { $multiply: [ "$buyprice", "$quantity" ] }},
            "revenueNoVat": {$sum : {$divide: [{ $multiply: [ "$sellprice", "$quantity" ] }, 1.21]}}
        }}
        ]
        ).then(function(sumMain){
        console.log(sumMain)
        const result = JSON.stringify(sumMain)
        console.log(result)
        res.send(result);
    })
})


module.exports = router;