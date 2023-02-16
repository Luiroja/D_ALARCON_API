
const express = require('express');
const cors =require('cors')
const connectDB = require('./config/db')
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;

const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');
const cartRoute = require('./routes/cartRoute');
const orderRoute = require('./routes/orderRoute');


connectDB()
const app = express();

app.use (express.json());
app.use (express.urlencoded({ extended: false }));
app.use(cors())


app.use ("/api/users", userRoute);
app.use ("/api/products", productRoute);
app.use ("/api/carts", cartRoute);
app.use ("/api/orders", orderRoute);



app.listen(port, ()=>console.log(`El servidor se inició en el puerto ${port}`))