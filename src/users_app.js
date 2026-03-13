const express = require('express');
const app = express();
const userRoutes = require('./route/user.route');

app.use(express.json());

app.use('/users', userRoutes);

const PORT = 5001;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`User-API en ligne sur le port ${PORT}`);
});