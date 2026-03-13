const express = require('express');
const app = express();
const userRoutes = require('./route/user.route');

app.use(express.json());

app.use('/users', userRoutes);

app.listen(80, () => {
    console.log("Serveur démarré sur http://localhost:80");
});