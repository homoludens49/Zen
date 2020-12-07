const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    orderId: {type: Number, required: true},
    email: {type: String, required: true},
    phone: {type: String, required: true},
    name: {type: String, required: true},
    productname: {type: String, required: true},
    quantity: {type: Number, required: true},
    currentPrice: {type: Number, required: true},
    itemCost: {type: Number, required: true},
    discountAmount: {type: Number, required: true},
    sku: { type: String, required: true},
    variation: { type: String, required: true},
    variationId: { type: String, required: true},
    orderShippingAmount: {type: Number, required: true},
    addressShipping: { type: String, required: false},
    customerNote: { type: String, required: false},
    orderDate: { type: Date, required: true},
    countryCode: { type: String, required: true},
    shipingMethod: { type: String, required: true},
    paymentMethod: { type: String, required: false},
    _parcel_machine: { type: String, required: false},
    link: { type: Object, required: false}
});
// const manualOrderSchema = mongoose.Schema({
//     _id: mongoose.Schema.Types.ObjectId,
//     orderId: {type: Number, required: true},
//     sku: { type: String, required: true},
//     quantity: {type: Number, required: true}
   
// });

module.exports = mongoose.model('Order', orderSchema)
// module.exports = mongoose.model('ManualOrder', manualOrderSchema)