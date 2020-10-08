const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        productId: {
            type: Number,
             required: true
            },
        sku: {
            type: String,
             required: true
            },
        model: {
            type: String,
             required: true
            },
        brand: {
            type: String,
             required: true
            },
        quantity: {
            type: Number,
             required: true
            },
        warehouse: {
            type: String,
             required: true
            },    
        buyprice: {
            type: Number,
             required: true
            },
        sellprice: {
            type: Number,
             required: true 
            }
    
})

module.exports = mongoose.model('Product', productSchema);