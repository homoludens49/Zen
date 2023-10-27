const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const AutoOrder = require("../models/autoOrder");
const Order = require("../models/order");
const Product = require("../models/product");

router.get("/stats", (req, res) => {
  Product.find({}).then((products) => {
    AutoOrder.find({}).then((orders) => {
      //convert Date to mm/dd/yyyy format
      const convertDate = (date) => {
        var d = new Date(date),
          month = "" + (d.getMonth() + 1),
          day = "" + d.getDate(),
          year = d.getFullYear();

        // if (month.length < 2) month = "0" + month;
        // if (day.length < 2) day = "0" + day;
       
        return [month, day, year].join("/");
      };
      const todaysOrders = orders.filter(
        (order) =>
          convertDate(order.orderDate) === new Date().toLocaleDateString()
      );
      
      const thisMonthOrders = orders.filter(
        order =>
          order.orderDate.getMonth() === new Date().getMonth() &&
          order.orderDate.getFullYear() === new Date().getFullYear()
         
      );
      
      //console.log(thisMonthOrders)
      //sum all order.total
      const sumOrders = (orders) => {
        let sum = 0;
        let totalorders = 0;
        let productCount = 0;
        let vat = 0;

        let costOfGoodsSold = 0;

        let makecommerceFee = 0;
        let paypalFee = 0;

        let fullfilmentFee = 0;
        let fullfilmentFeeVat = 0;
        let fullfilmentFeeTotal = 0;

        let shipping = 0;
        let shippingVat = 0;
        let shippingTotal = 0;

        let shippingFee = 0;
        let shippingFeeVat = 0;
        let shippingFeeTotal = 0;

        let totalNet = 0;
        let totalExpenses = 0;
        let totalVatToPay = 0;
        let totalVatToDeduct = 0;
        //find all products in database and save to array products

        let totalFixedCosts = 0 
        let phoneCosts =0
        let rentCosts =0  
        let accountancyCost = 0 
        let interestCost = 0 
        let carCost =0
        let salaryCost =0 
        let addsCost  = 0


        for (let i = 0; i < orders.length; i++) {
          // paypal transaction fee is 3.8% , maksekeskus transaction fee is 2% + 0.15 fixed fee per transaction
          // makecommerce transaction fee is 0.15 fixed fee per transaction
          if (orders[i].paymentMethod === "makecommerce") {
            makecommerceFee += 0.10 + orders[i].total * 0.013;
          } else if (orders[i].paymentMethod === "paypal") {
            paypalFee += orders[i].total * 0.038;
          }
          shipping += orders[i].orderShippingAmount / 1.21;
          shippingVat += orders[i].orderShippingAmount * 0.21;
          shippingTotal += orders[i].orderShippingAmount;

          if (orders[i].shipingMethod === "parcelmachine_omniva") {
            shippingFee += 1.65;
            shippingFeeVat += 1.65 * 0.21;
            shippingFeeTotal = shippingFee + shippingFeeVat;
          }else if(orders[i].shipingMethod === "parcelmachine_dpd"){
            shippingFee += 1.65;
            shippingFeeVat += 1.65 * 0.21;
            shippingFeeTotal = shippingFee + shippingFeeVat;
          }
          //for each product in orders.order sum total
          for (let j = 0; j < orders[i].order.length; j++) {
            sum += parseFloat(orders[i].order[j].total);
            vat += parseFloat(orders[i].order[j].total) * 0.21;
            productCount += parseFloat(orders[i].order[j].quantity);
            // Omniva fullfillment charge 0,30 per order + 0,30 per product + 1,05 per order + 0,20 per order
            fullfilmentFee +=
              0.3 + 0.3 * parseFloat(orders[i].order[j].quantity) + 1.05 + 0.2;
            fullfilmentFeeVat +=
              0.3 * 0.21 +
              0.3 * 0.21 * parseFloat(orders[i].order[j].quantity) +
              1.05 * 0.21 +
              0.2 * 0.21;
            fullfilmentFeeTotal = fullfilmentFee + fullfilmentFeeVat;

            const orderedProducts = products.filter(
              (product) => product.sku === orders[i].order[j].sku
            );
            //get costOfGoodsSold from orderedProducts buyprice and quantity
            if (orderedProducts.length > 0) {
              costOfGoodsSold +=
                parseFloat(orderedProducts[0].buyprice) *
                parseFloat(orders[i].order[j].quantity);
            } else {
              costOfGoodsSold += 0;
            }

            //#region

            //function that will find product by sku and return its buyprice
            // const getBuyPrice = async (sku) => {
            //   const product = await Product.findOne({ sku: sku });
            //   console.log(product.buyprice);
            //   return product.buyprice;
            // };
            // getBuyPrice(orders[i].order[j].sku)
            //   .then((product) => {
            //     costOfGoodsSold +=
            //       parseFloat(product.buyprice) *
            //       parseFloat(orders[i].order[j].quantity);
            //       console.log(costOfGoodsSold)
            //       return costOfGoodsSold
            //   })

            // .catch((err) => {
            //   console.log(err);
            // });
            //now set costOfGoodsSold to the return data
            // costOfGoodsSold = getBuyPrice(orders[i].order[j].sku);
            //console.log(costOfGoodsSold);

            //   let product = await Promise.resolve(Product.find({ "sku":orders[i].order[j].sku }))
            //   costOfGoodsSold += parseFloat(product[0].buyprice) * parseFloat(orders[i].order[j].quantity)
            //  console.log(costOfGoodsSold)

            //#endregion
          }

          totalVatFromSales = vat + shippingVat;
          totalVatToDeduct = shippingFeeVat + fullfilmentFeeVat;
          totalVatToPay = totalVatFromSales - totalVatToDeduct;
          phoneCosts = 205
          rentCosts = 50 
          accountancyCost = 1 * orders.length 
          interestCost = 171 
          carCost = 443
          salaryCost = 621
          addsCost = 1600 
          totalFixedCosts = phoneCosts + rentCosts + interestCost + carCost +salaryCost+addsCost

          totalExpenses =
            totalVatToPay +
            fullfilmentFee +
            shippingFee +
            makecommerceFee +
            paypalFee;

          totalNet = sum + shipping - totalExpenses - costOfGoodsSold - accountancyCost - totalFixedCosts;


         
        
        }
        return {
          sum: sum,
          totalorders: orders.length,
          productCount: productCount,
          vat: vat,

          makecommerceFee: makecommerceFee,
          paypalFee: paypalFee,

          fullfilmentFee: fullfilmentFee,
          fullfilmentFeeVat: fullfilmentFeeVat,
          fullfilmentFeeTotal: fullfilmentFeeTotal,

          shipping: shipping,
          shippingVat: shippingVat,
          shippingTotal: shippingTotal,

          shippingFee: shippingFee,
          shippingFeeVat: shippingFeeVat,
          shippingFeeTotal: shippingFeeTotal,

          totalVatFromSales: totalVatToPay,
          totalVatToDeduct: totalVatToDeduct,
          totalVatToPay: totalVatToPay,
          costOfGoodsSold: costOfGoodsSold,
          totalExpenses: totalExpenses,

          phoneCosts: phoneCosts,
          rentCosts: rentCosts,
          accountancyCost: accountancyCost,
          interestCost: interestCost,
          carCost: carCost,
          totalFixedCosts: totalFixedCosts,



          totalNet: totalNet,
        };
      };

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
        data: sumOrders(thisMonthOrders),
      };
      console.log(todayStats);
      res.send(todayStats);
    });
  });
});
//Find by specific criteria and perform math operation on it
router.get("/totalItems", (req, res) => {
  Product.aggregate([
    { $match: { warehouse: { $regex: ".*.*" } } },
    {
      $group: {
        _id: "",
        quantity: { $sum: "$quantity" },
        sellprice: { $sum: { $multiply: ["$sellprice", "$quantity"] } },
        buyprice: { $sum: { $multiply: ["$buyprice", "$quantity"] } },
        revenueNoVat: {
          $sum: { $divide: [{ $multiply: ["$sellprice", "$quantity"] }, 1.21] },
        },
      },
    },
  ]).then(function (sumbyWarehouse) {
    const result = JSON.stringify(sumbyWarehouse);

    res.send(result);
  });
});
router.get("/totalItemsOmniva", (req, res) => {
  Product.aggregate([
    { $match: { warehouse: { $regex: ".*Omn.*" } } },
    {
      $group: {
        _id: "",
        quantity: { $sum: "$quantity" },
        sellprice: { $sum: { $multiply: ["$sellprice", "$quantity"] } },
        buyprice: { $sum: { $multiply: ["$buyprice", "$quantity"] } },
        revenueNoVat: {
          $sum: { $divide: [{ $multiply: ["$sellprice", "$quantity"] }, 1.21] },
        },
      },
    },
  ]).then(function (sumOmn) {
    console.log(sumOmn);
    const result = JSON.stringify(sumOmn);
    console.log(result);
    res.send(result);
  });
});
router.get("/totalItemsMain", (req, res) => {
  Product.aggregate([
    { $match: { warehouse: { $regex: ".*Ganibu.*" } } },
    {
      $group: {
        _id: "",
        quantity: { $sum: "$quantity" },
        sellprice: { $sum: { $multiply: ["$sellprice", "$quantity"] } },
        buyprice: { $sum: { $multiply: ["$buyprice", "$quantity"] } },
        revenueNoVat: {
          $sum: { $divide: [{ $multiply: ["$sellprice", "$quantity"] }, 1.21] },
        },
      },
    },
  ]).then(function (sumMain) {
    console.log(sumMain);
    const result = JSON.stringify(sumMain);
    console.log(result);
    res.send(result);
  });
});

module.exports = router;
