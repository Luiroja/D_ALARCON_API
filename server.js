
const express = require('express');
const connectDB = require('./config/db')
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;

const userRoute = require('./routes/userRoute')


connectDB()
const app = express();

app.use (express.json());
app.use (express.urlencoded({ extended: false }));


app.use ("/api/users", userRoute)



app.listen(port, ()=>console.log(`El servidor se inició en el puerto ${port}`))