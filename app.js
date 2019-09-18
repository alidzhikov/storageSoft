const express = require('express');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');
const customerRoutes = require('./routes/customer');
const orderRoutes = require('./routes/order');
const stockRoutes = require('./routes/stock');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/customers', customerRoutes);
app.use('/orders', orderRoutes);
app.use('/stocks', stockRoutes);

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message || error.error;
    const data = error.data;
    res.status(status).json({message: message, data: data});
});

mongoose
    .connect(
        'mongodb+srv://barbados_1400:thziygHbV0ransdu@nodejscoursemain-iaevk.mongodb.net/mo11-test?retryWrites=true',{ useNewUrlParser: true })//add to env later
    .then(res => {
        app.listen(3000);
    })
    .catch(err => console.log(err));