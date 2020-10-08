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
    console.log(data[0])
    for(i=0;i<data.length;i++){
        const sku = data[i].sku
        const orderQuant = data[i].quantity
        const order = new Order({
            _id: new mongoose.Types.ObjectId(),
            orderId: data[i].orderId,
            email: data[i].email,
            phone: data[i].phone,
            name: data[i].name,
            itemNr: data[i].itemNr,
            sku: data[i].sku,
            quantity: data[i].quantity,
            discountAmount: data[i].discountAmount,
            currentPrice: data[i].currentPrice,
            itemCost: data[i].itemCost,
            quantityX: data[i].quantityX,
            variation: data[i].variation,
            variationId: data[i].variationId,
            itemNrX: data[i].itemNrX,
            itemId: data[i].itemId,
            orderShippingAmount: data[i].orderShippingAmount,
            discountAmountX: data[i].discountAmountX,
            paymentMethodTitleX: data[i].paymentMethodTitleX,
            wc_shipping_omniva_parcel_machines_lv_terminal: data[i].wc_shipping_omniva_parcel_machines_lv_terminal,
            wc_shipping_omniva_parcel_machines_lt_terminal: data[i].wc_shipping_omniva_parcel_machines_lt_terminal,
            wc_shipping_omniva_parcel_machines_ee_terminal: data[i].wc_shipping_omniva_parcel_machines_ee_terminal,
            adressandbillindX: data[i].adressandbillindX,
            cityBillingX: data[i].cityBillingX,
            orderStatusX: data[i].orderStatusX,
            customerNote: data[i].customerNote,
            orderDate: data[i].orderDate,
            countryCode: data[i].countryCode,
            shipingMethod: data[i].shipingMethod,
            paymentMethod: data[i].paymentMethod,
            _parcel_machine: data[i]._parcel_machine,
            _shipping_address_1: data[i]._shipping_address_1,
            _shipping_address_2: data[i]._shipping_address_2,
            _shipping_city: data[i]._shipping_city,
            _shipping_address_index: data[i]._shipping_address_index,
            _shipping_postcode: data[i]._shipping_postcode
        });
    order.save()
    Product.update({sku:sku, "warehouse": "Omniva"},{$inc:{quantity:-orderQuant}}).then(function(product){
        console.log(product)
    })
    }
    res.send('order succesfully added')
})

router.post('/productUpload' ,upload.single('file'), (req ,res)=>{
    const fileName = req.file.filename
    const wb = xlsx.readFile(`./fileUploads/${fileName}`)
    const products = wb.Sheets["Products"]
    const data = xlsx.utils.sheet_to_json(products)
    console.log(data[0])
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