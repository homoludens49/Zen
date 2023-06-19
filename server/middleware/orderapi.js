const axios = require("axios");
const AutoOrder = require("../api/models/autoOrder");

const orderApi = () => {
  axios
    .get(
      `https://smartmom.shop/wp-json/wc/v2/orders?per_page=15&consumer_key=ck_c0ea57bb2ad12ac882f3da895304e18c2a39189f&consumer_secret=cs_015faf2496f59f93379193b3408b4f6994be7374`
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
      `https://alilo.lv/wp-json/wc/v2/orders?per_page=16&consumer_key=${process.env.AK}&consumer_secret=${process.env.AC}`
    )
    .then((response) => {
      
      checkOrders(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};


checkOrders = async (orders) => {
  
  var arr = [];
  var newOrders = [];
 
  for (i = 0; i < orders.length; i++) {

    orders[i].status === "processing"
      ? newOrders.push(orders[i])
      : null;
  }
  
  // for (i = 0; i < arr.length; i++) {
  //   const item = await AutoOrder.findOne({ orderId: arr[i].id });
  //   !item ? newOrders.push(arr[i]) : null;
  // }
  

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

module.exports = setInterval(orderApi, 33120);
module.exports = setInterval(orderApiAlilo, 43700);

// module.exports = setInterval(orderApi, 3600000)
