const axios = require('axios');

function omnivaStock(stock){
    if(stock.warehouse === 'Omniva'){
        return stock
    }
}

const updateShop =(stock)=>{
    const ostock = stock.filter(omnivaStock)
    
}

module.exports = updateShop