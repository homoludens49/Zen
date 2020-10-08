const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    orderId: {type: Number, required: true},
    email: {type: String, required: true},
    phone: {type: String, required: true},
    name: {type: String, required: true},
    itemNr: {type: Number, required: true},
    sku: { type: String, required: true},
    quantity: {type: Number, required: true},
    discountAmount: {type: Number, required: true},
    currentPrice: {type: Number, required: true},
    itemCost: {type: Number, required: true},
    quantityX: {type: Number, required: true},
    variation: { type: String, required: true},
    variationId: { type: String, required: true},
    itemNrX: {type: Number, required: true},
    itemId: {type: Number, required: true},
    orderShippingAmount: {type: Number, required: true},
    discountAmountX: { type: Number, required: false},
    paymentMethodTitleX: { type: String, required: false},
    wc_shipping_omniva_parcel_machines_lv_terminal: { type: String, required: false},
    wc_shipping_omniva_parcel_machines_lt_terminal: { type: String, required: false},
    wc_shipping_omniva_parcel_machines_ee_terminal: { type: String, required: false},
    adressandbillindX: { type: String, required: false},
    cityBillingX: { type: String, required: false},
    orderStatusX: { type: String, required: true},
    customerNote: { type: String, required: false},
    orderDate: { type: Date, required: true},
    countryCode: { type: String, required: true},
    shipingMethod: { type: String, required: true},
    paymentMethod: { type: String, required: false},
    _parcel_machine: { type: String, required: false},
    _shipping_address_1: { type: String, required: false},
    _shipping_address_2: { type: String, required: false},
    _shipping_city: { type: String, required: false},
    _shipping_address_index: { type: String, required: false},
    _shipping_postcode: { type: String, required: false}
   
});
const manualOrderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    orderId: {type: Number, required: true},
    sku: { type: String, required: true},
    quantity: {type: Number, required: true}
   
});

module.exports = mongoose.model('Order', orderSchema)
module.exports = mongoose.model('ManualOrder', manualOrderSchema)