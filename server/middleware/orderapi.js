const axios = require("axios");
const AutoOrder = require("../api/models/autoOrder");

const orderApi = () => {
  axios
    .get(
      "https://smartmom.shop/wp-json/wc/v2/orders?per_page=70&consumer_key=ck_580fcdbfc9bd331bd7471c716503b11432d35065&consumer_secret=cs_738a34b443cf792cd4c6938a62e6b6dd0508fb2a"
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
      "https://alilo.lv/wp-json/wc/v2/orders?per_page=70&consumer_key=ck_3ffb4a3f3bf0b0b87da2245b8f40465c6066bef7&consumer_secret=cs_ec6260b78cd9a9e1dad3c05bc4fda1d7c0ffaa85"
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
    1;
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
    orders[i].shipping_lines[0].method_id === "parcelmachine_omniva"
      ? arr.push(orders[i])
      : null;
  }
  for (i = 0; i < arr.length; i++) {
    const item = await AutoOrder.findOne({ orderId: arr[i].id });
    !item ? newOrders.push(arr[i]) : null;
  }

  //check why it is still requaesting for alilo
  if (newOrders.length > 0) {
    1;
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

module.exports = setInterval(orderApi, 40000);
module.exports = setInterval(orderApiAlilo, 50000);

// module.exports = setInterval(orderApi, 3600000)
