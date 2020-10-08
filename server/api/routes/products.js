const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const cors = require('cors');
const Product = require ('../models/product')

router.use(cors());



router.get('/', (req,res)=>{ 
    Product.find({}).then(function(products){
        res.send(products);
    })
    console.log('bash message')
})

router.post('/', (req,res,next)=>{
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        productId: req.body.productId,
        sku: req.body.sku,
        model: req.body.model,
        brand: req.body.brand,
        warehouse: req.body.warehouse,
        quantity: req.body.quantity,
        buyprice: req.body.buyprice,
        sellprice: req.body.sellprice
    });
    product
    .save()
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
//
router.patch('/:sku', (req,res,next)=>{
    const sku = req.body.sku; //set sku from body as target to update
    Product.update({ sku: sku}, {$set: req.body})
    .exec()
    .then(result =>{
        console.log(result);
        res.status(200).json({
            message: "Product updated",
            request: {
                type: "GET",
                url: 'http://localhost:3000/products/'+sku
            }
        });
    }).catch(err =>{
        console.log(err);
        res.status(500).json({error: err});
    });
});
//update one entry 
router.post('/updatePlusOne',(req, res, next)=>{
    const sku = req.body.sku
    const id = req.body._id
    Product.updateOne({sku:sku, "_id":id},
    {$inc:{quantity:+1}}
    ).then(result =>{
        console.log(result)
        res.status(201).json({
            message: 'Updated +1'
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: err})
    })
}),
router.post('/updateMinusOne',(req, res, next)=>{
    const sku = req.body.sku
    const id = req.body._id
    Product.updateOne({sku:sku, "_id":id},
    {$inc:{quantity:-1}}
    ).then(result =>{
        console.log(result)
        res.status(201).json({
            message: 'Updated -1'
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: err})
    })
})



module.exports = router;