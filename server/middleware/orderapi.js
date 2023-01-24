const axios = require("axios");
const AutoOrder = require("../api/models/autoOrder");

const orderApi = () => {
  axios
    .get(
      `https://smartmom.shop/wp-json/wc/v2/orders?per_page=10&consumer_key=${process.env.SMK}&consumer_secret=${process.env.SMC}`
    )
    .then((response) => {
      
      checkOrders(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};
const orderApiAlilo = () => {
  axios
    .get(
      `https://alilo.lv/wp-json/wc/v2/orders?per_page=5&consumer_key=${process.env.AK}&consumer_secret=${process.env.AC}`
    )
    .then((response) => {
      checkOrders(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

// This function parse API Data, Check if order is new or not, and if NEW , fire post request to Order and Product databases.
checkOrders = async (orders) => {
  var forDpd = [];
  var newDpdOrders = [];
  for (i = 0; i < orders.length; i++) {
    orders[i].status === "processing" &&
    orders[i].shipping_lines[0].method_id === "parcelmachine_dpd" 
      ? forDpd.push(orders[i])
      : null;
  }
  for (i = 0; i < forDpd.length; i++) {
    const item = await AutoOrder.findOne({ orderId: forDpd[i].id });
    !item ? newDpdOrders.push(forDpd[i]) : null;
  }

  if (newDpdOrders.length > 0) {
    for (let i = 0; i < newDpdOrders.length; i++) {
      const res = await axios.post(
        "http://localhost:1337/dpdautoorders/dpdAutoOrders",
        newDpdOrders[i]
      );

      return res;
    }
  } else {
    console.log("there is no new orders for DPD");
  }

  var arr = [];
  var newOrders = [];
  for (i = 0; i < orders.length; i++) {
    orders[i].status === "processing" &&
    orders[i].shipping_lines[0].method_id === "parcelmachine_omniva" || orders[i].shipping_lines[0].method_id === "courier_omniva"
      ? arr.push(orders[i])
      : null;
  }
  for (i = 0; i < arr.length; i++) {
    const item = await AutoOrder.findOne({ orderId: arr[i].id });
    !item ? newOrders.push(arr[i]) : null;
  }
  //check why it is still requaesting for alilo
  if (newOrders.length > 0) {
    for (let i = 0; i < newOrders.length; i++) {
      const res = await axios.post(
        "http://localhost:1337/autoorders/autoOrders",
        newOrders[i]
      );
      return res;
    }
  } else {
    console.log("there is no new orders");
  }
};

module.exports = setInterval(orderApi, 25000);
module.exports = setInterval(orderApiAlilo, 50000);

// module.exports = setInterval(orderApi, 3600000)
