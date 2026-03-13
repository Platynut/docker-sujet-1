const express = require('express');
const app = express();
const productRoutes = require('./route/products.route');

app.use(express.json());

app.use('/products', productRoutes);

const PORT = 5002;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Product-API en ligne sur le port ${PORT}`);
});