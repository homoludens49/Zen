const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const xlsx = require('xlsx')
const multer = require('multer') 

const Order = require('../models/order');
const Product = require('../models/product');


const upload = multer({
    dest: './fileUploads/'
})

router.get('/', (req,res)=>{ 
    Order.find({}).then(function(orders){
        res.send('route');
    })
})
router.get('/productUpload', (req,res)=>{ 
    Order.find({}).then(function(orders){
        res.send('prod');
    })
})
router.get('/orderUpload', (req,res)=>{ 
    Order.find({}).then(function(orders){
        res.send('orders');
    })
})

router.post('/orderUpload' ,upload.single('file'), (req ,res)=>{
    const fileName = req.file.filename
    const wb = xlsx.readFile(`./fileUploads/${fileName}`)
    const orders = wb.Sheets["Orders"]
    const data = xlsx.utils.sheet_to_json(orders)
    console.log(data)
    for(i=0;i<data.length;i++){
        const sku = data[i].sku
        const orderQuant = data[i].quantity
        const order = new Order({
            _id: new mongoose.Types.ObjectId(),
            orderId: data[i].orderId,
            email: data[i].email,
            phone: data[i].phone,
            name: data[i].name,
            productname: data[i].productname,
            quantity: data[i].quantity,
            currentPrice: data[i].currentPrice,
            itemCost: data[i].itemCost,
            discountAmount: data[i].discountAmount,
            sku: data[i].sku,
            variation: data[i].variation,
            variationId: data[i].variationId,
            orderShippingAmount: data[i].orderShippingAmount,
            addressShipping: data[i].addressShipping,
            customerNote: data[i].customerNote,
            orderDate: data[i].orderDate,
            countryCode: data[i].countryCode,
            shipingMethod: data[i].shipingMethod,
            paymentMethod: data[i].paymentMethod,
            _parcel_machine: data[i]._parcel_machine,
            link: data[i].link
        });
    order.save()
    Product.updateOne({sku:sku, "warehouse": "Omniva"},{$inc:{quantity:-orderQuant}}).then(function(product){
        console.log(product)
    })
    }
    res.send('order succesfully added')
})
//This is an upload route for React front
router.post('/productUpload' ,upload.single('file'), (req ,res)=>{
    const fileName = req.file.filename
    const wb = xlsx.readFile(`./fileUploads/${fileName}`)
    const products = wb.Sheets["Products"]
    const data = xlsx.utils.sheet_to_json(products)
    for(i=0;i<data.length;i++){
        const product = new Product({
            _id: new mongoose.Types.ObjectId(),
            productId: data[i].productId,
            sku: data[i].sku,
            model: data[i].model,
            brand: data[i].brand,
            warehouse: data[i].warehouse,
            quantity: data[i].quantity,
            buyprice: data[i].buyprice,
            sellprice: data[i].sellprice
        });
        product.save()
    }
    res.send('products succesfully added')
})


module.exports = router;