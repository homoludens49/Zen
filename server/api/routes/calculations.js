const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')

const AutoOrder = require("../models/autoOrder");
const Order = require('../models/order');
const Product = require('../models/product');

router.get("/stats", (req, res) => {
    AutoOrder.find({}).then((orders) => {
        //convert Date to mm/dd/yyyy format
const convertDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [month, day, year].join("/");
  };
  
 
  const thisMonthOrders = orders.filter(
    (order) =>
      order.orderDate.getMonth() === new Date().getMonth() && order.orderDate.getFullYear() === new Date().getFullYear()
  );
  

  const todaysOrders = orders.filter(
    (order) =>
      convertDate(order.orderDate) === new Date().toLocaleDateString()
  );
  const totalOmniva = todaysOrders.filter(
    (order) => order.shipingMethod === "parcelmachine_omniva"
  ).length;
  const totalDPD = todaysOrders.filter(
    (order) => order.shipingMethod === "parcelmachine_dpd"
  ).length;
  //count total sales from todaysOrders total parameter
  const totalSales = todaysOrders.reduce(
    (total, order) => total + parseFloat(order.total),
    0
  );
  const totalShipping = todaysOrders.reduce(
    (total, order) => total + parseFloat(order.orderShippingAmount),
    0
  );
  const totalProducts = totalSales - totalShipping;
  const todayStats = {
    totalSales: totalSales.toFixed(2),
    totalShipping: totalShipping.toFixed(2),
    totalProducts: totalProducts.toFixed(2),
    totalOmniva: totalOmniva,
    totalDPD: totalDPD,
  };
      res.send(todayStats);
    });
  });


//Find by specific criteria and perform math operation on it
router.get('/totalItems', (req,res)=>{ 
    Product.aggregate([
        {$match:{"warehouse": {$regex : ".*.*"}}},
        {
            $group: 
            {"_id": "", "quantity": {$sum : "$quantity"},
            "sellprice": {$sum : { $multiply: [ "$sellprice", "$quantity" ] }},
            "buyprice": {$sum : { $multiply: [ "$buyprice", "$quantity" ] }},
            "revenueNoVat": {$sum : {$divide: [{ $multiply: [ "$sellprice", "$quantity" ] }, 1.21]}},
            },  
        },
        
        ]
        ).then(function(sumbyWarehouse){
        const result = JSON.stringify(sumbyWarehouse)
    
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