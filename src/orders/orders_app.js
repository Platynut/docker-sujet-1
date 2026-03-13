const express = require('express');
const app = express();
const orderRoute = require('./route/order.route');

app.use(express.json());

app.use('/orders', orderRoute);

const PORT = 5003;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Product-API en ligne sur le port ${PORT}`);
});