const { response } = require('express');
const WooCommerceAPI  = require('woocommerce-api')
const axios = require('axios');
const pdf = require('html-pdf');
const fs = require('fs');

const WooCommerce = new WooCommerceAPI({
    url: 'https://smartmom.shop',
    consumerKey: 'ck_10aadc80d7cd59cc8a002666a23be170a34677ad',
    consumerSecret: 'cs_56358f9df32852643f1c37612660b2a1d72811a1',
    version: 'v3'
  });


// const data = {
//   product: {
//     stock_quantity :6
//   }
// }

// WooCommerce.postAsync('products/1310', data).then(result => {
//     return console.log(JSON.parse(result.toJSON().body)) ;
// })

// module.exports = getProducts()