const axios = require('axios');
const AutoOrder = require('../api/models/autoOrder');

const orderApi = () =>{
    axios.get('https://smartmom.shop/wp-json/wc/v2/orders?consumer_key=ck_10aadc80d7cd59cc8a002666a23be170a34677ad&consumer_secret=cs_56358f9df32852643f1c37612660b2a1d72811a1')
  .then(response => {
    checkOrders(response.data)
  })
  .catch(error => {
    console.log(error);
  });
}
const orderApiAlilo = () =>{
  axios.get('https://alilo.lv/wp-json/wc/v2/orders?consumer_key=ck_3ffb4a3f3bf0b0b87da2245b8f40465c6066bef7&consumer_secret=cs_ec6260b78cd9a9e1dad3c05bc4fda1d7c0ffaa85')
.then(response => {
  checkOrders(response.data)
})
.catch(error => {
  console.log(error);
});
}
const orderApiZazu = () =>{
  axios.get('https://zazu-kids.lv/wp-json/wc/v2/orders?consumer_key=ck_456dfeae2650196a0c2f86399c740ad853765e82&consumer_secret=cs_f6caa60cdbb259e0e80f1fb9fdc25cc3ea28f7c6')
.then(response => {
  checkOrders(response.data)
})
.catch(error => {
  console.log(error);
});
}

// This function parse API Data, Check if order is new or not, and if NEW , fire post request to Order and Product databases.
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
 //check why it is still requaesting for alilo
 if(newOrders.length>0){
  for(let i=0;i<newOrders.length;i++){
    const res = await axios.post('http://localhost:1337/autoorders/autoOrders', newOrders[i]) 
    return res
  }
 }else{
   console.log('there is no new orders')
 }
}

module.exports = setInterval(orderApi, 1210000)
module.exports = setInterval(orderApiAlilo, 1200000)
module.exports = setInterval(orderApiZazu, 1224000)
// module.exports = setInterval(orderApi, 3600000)
