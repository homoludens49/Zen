const axios = require("axios");

const orderApi = async (url, consumerKey, consumerSecret) => {
  try {
    const response = await axios.get(
      `${url}/wp-json/wc/v2/orders?per_page=10&consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`
    );
    await checkOrders(response.data);
  } catch (error) {
    console.log(error);
  }
};

const orderApiAlilo = async (url, consumerKey, consumerSecret) => {
  try {
    const response = await axios.get(
      `${url}/wp-json/wc/v2/orders?per_page=10&consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`
    );
    await checkOrders(response.data);
  } catch (error) {
    console.log(error);
  }
};
const checkOrders = async (orders) => {
  const newOrders = orders.filter(order => order.status === 'processing');
  if (newOrders.length > 0) {
    for (const order of newOrders) {
      try {
        const response = await axios.post('http://localhost:1337/autoorders/autoOrders', order);
        console.log(`Order processed successfully: ${order.id}`, response.data);
      } catch (error) {
        console.error(`Error processing order: ${order.id}`, error.message);
        // Handle the error if needed
      }
    }
  } else {
    console.log('There are no new orders');
  }
};
// const checkOrders = async (orders) => {
//   const newOrders = orders.filter(order => order.status === 'processing');
//   if (newOrders.length > 0) {
//     const responses = await Promise.all(
//       newOrders.map(async (order) => {
//         try {
//           return await axios.post('http://localhost:1337/autoorders/autoOrders', order);
//         } catch (error) {
//           // Handle the error if needed
//           console.error(`Error processing order: ${order.id}`, error.message);
//           return null;
//         }
//       })
//     );

//     // Optionally, you can return all responses or handle them as needed
//     return responses;
//   } else {
//     console.log('There are no new orders');
//     return null; // or handle accordingly
//   }
// };

const processOrderApis = async () => {
  await orderApi('https://smartmom.shop', process.env.SMK, process.env.SMC);
  await orderApiAlilo('https://alilo.lv', process.env.AK, process.env.AC);
};

module.exports = setInterval(processOrderApis, 15000)


