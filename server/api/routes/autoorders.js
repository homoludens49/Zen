const express = require("express");
const axios = require("axios");
const router = express.Router();
const mongoose = require("mongoose");
const AutoOrder = require("../models/autoOrder");
const Product = require("../models/product");
const puppeteerCreatePdf = require("../../functions/createPDF");
const createXML = require("../../functions/createXML");
const nodemailer = require("nodemailer");

router.get("/", (req, res) => {
  AutoOrder.find({}).then((orders) => {
    res.send(orders);
  });
});

router.post("/autoOrders", (req, res, next) => {
 
  const data = req.body;
  puppeteerCreatePdf(data);
  createXML(data);

  
  const updateOrderStatus = async (id, url, consumerKey, consumerSecret) => {
    try {
      await axios.put(
        `${url}/wp-json/wc/v3/orders/${id}?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`,
        { status: "completed" }
      );
    } catch (error) {
      console.error(`Error updating order status for ID ${id}:`, error.message);
      // Handle the error as needed
    }
  };
  
  const processOrder = (data) => {
    const { id, payment_url } = data;
  
    if (payment_url.includes('alilo')) {
      updateOrderStatus(id, 'https://alilo.lv', process.env.AK, process.env.AC);
    } else {
      updateOrderStatus(id, 'https://smartmom.shop', process.env.SMK, process.env.SMC);
    }
  };
  
  processOrder(data);


  // const updateSmartmomOrderStatus = async (id) => {
  //   await axios.put(
  //     `https://smartmom.shop/wp-json/wc/v3/orders/${id}?consumer_key=${process.env.SMK}&consumer_secret=${process.env.SMC}`,
  //     { status: "completed" }
  //   );
  // };
  // const updateAliloOrderStatus = async (id) => {
  
  //   await axios.put(
  //     `https://alilo.lv/wp-json/wc/v3/orders/${id}?consumer_key=${process.env.AK}&consumer_secret=${process.env.AC}`,
  //     { status: "completed" }
  //   );
  // };


  // if(data.payment_url.includes('alilo')){
  //   updateAliloOrderStatus(data.id)
  // }else{
  //   updateSmartmomOrderStatus(data.id)
  // }
 
 

  

  //This part adds an Order from API that are fetched every 15 min
  const autoOrder = new AutoOrder({
    _id: new mongoose.Types.ObjectId(),
    orderId: req.body.id,
    email: req.body.billing.email,
    phone: req.body.billing.phone,
    name: req.body.billing.first_name + " " + req.body.billing.last_name,
    total: req.body.total,
    order: req.body.line_items,
    orderShippingAmount:
      Number(req.body.shipping_total) + Number(req.body.shipping_tax),
    addressShipping:
      req.body.shipping.address_1 + " " + req.body.shipping.address_2,
    customerNote: req.body.customer_note,
    orderDate: req.body.date_modified,
    countryCode: req.body.shipping.country,
    shipingMethod: req.body.shipping_lines[0].method_id,
    paymentMethod: req.body.payment_method,
    _parcel_machine: req.body.meta_data[2].value,
    link: req.body._links,
  });

  autoOrder.save();

  //This part of code deduct item quantity from order in Product database. It deducts from "Omniva Warehouse" because all products are stored there
  const items = req.body.line_items;
  for (i = 0; i < items.length; i++) {
    //if ZOE Gray, add 0 to SKU. Need this because cannot fix in Woocommerce product
    if (items[i].sku === "635292894398") {
      items[i].sku = "0635292894398";
    }
    //Code to identify items in complect
    //#region

    if (items[i].sku === "KOMPL") {
      const item1lang = items[i].meta_data[0].value;
      const item1color = items[i].meta_data[1].value;
      const item2color = items[i].meta_data[2].value;
      const item2lang = items[i].meta_data[3].value;
      // console.log(item1lang, item1color, item2color, item2lang);
      const itemsInKompl = [];
      item1lang === "RU" && item1color === "Голубой"
        ? itemsInKompl.push("6954644609058")
        : item1lang === "RU" && item1color === "Розовый"
        ? itemsInKompl.push("6954644609089")
        : item1lang === "RU" && item1color === "Фиолетовый"
        ? itemsInKompl.push("6954644609065")
        : item1lang === "RU" && item1color === "Желтый"
        ? itemsInKompl.push("6954644609072")
        : item1lang === "Рус" && item1color === "Zils"
        ? itemsInKompl.push("6954644609058")
        : item1lang === "Рус" && item1color === "Rozā"
        ? itemsInKompl.push("6954644609089")
        : item1lang === "Рус" && item1color === "Violets"
        ? itemsInKompl.push("6954644609065")
        : item1lang === "Рус" && item1color === "Dzeltens"
        ? itemsInKompl.push("6954644609072")
        : item1lang === "Lv" && item1color === "Голубой"
        ? itemsInKompl.push("6954644609058LV")
        : item1lang === "Lv" && item1color === "Розовый"
        ? itemsInKompl.push("6954644609089LV")
        : item1lang === "Lv" && item1color === "Фиолетовый"
        ? itemsInKompl.push("6954644609065LV")
        : item1lang === "Lv" && item1color === "Желтый"
        ? itemsInKompl.push("6954644609072LV")
        : item1lang === "LV" && item1color === "Zils"
        ? itemsInKompl.push("6954644609058LV")
        : item1lang === "LV" && item1color === "Rozā"
        ? itemsInKompl.push("6954644609089LV")
        : item1lang === "LV" && item1color === "Violets"
        ? itemsInKompl.push("6954644609065LV")
        : item1lang === "LV" && item1color === "Dzeltens"
        ? itemsInKompl.push("6954644609072LV")
        : "test1";
      item2lang === "Рус" && item2color === "Голубой"
        ? itemsInKompl.push("6954644609287")
        : item2lang === "Рус" && item2color === "Розовый"
        ? itemsInKompl.push("6954644609300")
        : item2lang === "Рус" && item2color === "Фиолетовый"
        ? itemsInKompl.push("6954644602424")
        : item2lang === "Рус" && item2color === "Красный"
        ? itemsInKompl.push("6954644609294")
        : item2lang === "RU" && item2color === "Zils"
        ? itemsInKompl.push("6954644609287")
        : item2lang === "RU" && item2color === "Rozā"
        ? itemsInKompl.push("6954644609300")
        : item2lang === "RU" && item2color === "Violets"
        ? itemsInKompl.push("6954644602424")
        : item2lang === "RU" && item2color === "Sarkans"
        ? itemsInKompl.push("6954644609294")
        : item2lang === "Lv" && item2color === "Голубой"
        ? itemsInKompl.push("6954644609287LV")
        : item2lang === "Lv" && item2color === "Розовый"
        ? itemsInKompl.push("6954644609300LV")
        : item2lang === "Lv" && item2color === "Фиолетовый"
        ? itemsInKompl.push("6954644602424LV")
        : item2lang === "Lv" && item2color === "Красный"
        ? itemsInKompl.push("6954644609294LV")
        : item2lang === "LV" && item2color === "Zils"
        ? itemsInKompl.push("6954644609287LV")
        : item2lang === "LV" && item2color === "Rozā"
        ? itemsInKompl.push("6954644609300LV")
        : item2lang === "LV" && item2color === "Violets"
        ? itemsInKompl.push("6954644602424LV")
        : item2lang === "LV" && item2color === "Sarkans"
        ? itemsInKompl.push("6954644609294LV")
        : "test2";
      //#endregion

      for (i = 0; i < itemsInKompl.length; i++) {
        Product.updateOne(
          { sku: itemsInKompl[i], warehouse: "Omniva" },
          { $inc: { quantity: -1 } }
        )
          .then(function (product) {
            console.log(`Order ${req.body.id} successfully processed`);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      
     
      Product.updateOne(
        { sku: items[i].sku, warehouse: "Omniva" },
        { $inc: { quantity: -items[i].quantity } }
      )
        .then(function (product) {
         
          console.log(`Order ${req.body.id} successfully processed`);
          res.send('zdarova zaebal');
        })
        .catch((err) => {
        
          console.log(err);
        });
    }
   
  } 
});

module.exports = router;