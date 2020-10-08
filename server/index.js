const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require(`dotenv/config`);
//Routers
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const uploadRoutes = require('./api/routes/uploads');
const calculationsRoutes = require('./api/routes/calculations');
//App
const app = express();
//DB Connections
const db = mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true,
     useUnifiedTopology: true },
     console.log("connected to DB")
);


//Middlewares
app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json())
//Routes that handle requests
app.use('/products', productRoutes)
app.use('/orders', orderRoutes)
app.use('/uploads', uploadRoutes)
app.use('/calculations', calculationsRoutes)






//localhost:3000 welcome msg
app.get('/', (req,res)=>{ 
    console.log('bash message')
    res.json({
    message: "server is up up up , client message"
})
})

//Error handler
app.use((req,res,next)=>{
    const error = new Error('Not Found!');
    error.status= 404;
    next(error);
})
app.use((error, req,res,next)=>{
res.status(error.status || 500);
res.json({
    error:{
        message: error.message
    }
})
});

const port = process.env.PORT || 3000
app.listen(port, ()=> (console.log(`listening on ${port}`)))