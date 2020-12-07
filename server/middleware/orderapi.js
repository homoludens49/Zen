const WooCommerceAPI = require('woocommerce-api');
const https = require('https');
const axios = require('axios');

const mongoose = require('mongoose')

const AutoOrder = require('../api/models/autoOrder');
const { response } = require('express');

const orderRoutes = require('../api/routes/autoorders');


checkOrders=async(orders)=>{
    var arr = []
    var newOrders = []
    for(i=0;i<orders.length;i++){
      orders[i].status === "processing" ? ( arr.push(orders[i])) : (null)
    }
    for(i=0;i<arr.length;i++){
     const item = await AutoOrder.findOne({orderId:arr[i].id})
    !item ? newOrders.push(arr[i]) : null
   } 
   for(i=0;i<newOrders.length;i++){
     const res = await axios.post('http://localhost:1337/autoorders/autoOrders', newOrders[i]) 
     return res
   }
  
}


const orderApi = () =>{
    axios.get('https://smartmom.shop/wp-json/wc/v2/orders?consumer_key=ck_10aadc80d7cd59cc8a002666a23be170a34677ad&consumer_secret=cs_56358f9df32852643f1c37612660b2a1d72811a1')
  .then(response => {
    checkOrders(response.data)
  })
  .catch(error => {
    console.log(error);
  });
}
module.exports = setInterval(orderApi, 3600000)
// module.exports = setInterval(orderApi, 3600000)
