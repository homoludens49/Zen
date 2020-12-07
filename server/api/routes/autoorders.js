const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const AutoOrder = require('../models/autoOrder');
const Product = require('../models/product');

router.post('/autoOrders', (req,res,next)=>{
    const autoOrder = new AutoOrder({
        _id: new mongoose.Types.ObjectId(),
        orderId: req.body.id,
        email: req.body.billing.email,
        phone: req.body.billing.phone,
        name: req.body.billing.first_name + ' ' + req.body.billing.last_name,
        order: req.body.line_items,
        orderShippingAmount: Number(req.body.shipping_total) + Number(req.body.shipping_tax),
        addressShipping: req.body.shipping.address_1 + ' ' + req.body.shipping.address_2,
        customerNote: req.body.customer_note,
        orderDate: req.body.date_modified,
        countryCode: req.body.shipping.country,
        shipingMethod: req.body.shipping_lines[0].method_id,
        paymentMethod: req.body.payment_method,
        _parcel_machine: req.body.meta_data[2].value,
        link: req.body._links,
    }); 
    autoOrder.save()
    const items = req.body.line_items
    for(i=0;i<items.length;i++){
        Product.updateOne({sku:items[i].sku, "warehouse": "Omniva"},
        {$inc:{quantity:-items[i].quantity}})
        .then(function(product){
            console.log(product)
            })
        .catch(err => {
                console.log(err);
            });
    }
    // Take this to calculate KOMPL console.log(items[0].meta_data[0].value)
});


module.exports = router;