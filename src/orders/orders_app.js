const express = require('express');
const app = express();
const orderRoute = require('./route/order.route');
const db = require('./model/index');

app.use(express.json());

app.use('/', orderRoute);

const PORT = 5003;

async function waitForDatabase(retries = 10, delay = 3000) {
    for (let i = 0; i < retries; i++) {
        try {
            console.log(`Tentative de connexion à la BDD (${i + 1}/${retries})...`);
            await db.authenticate();
            console.log('Connexion à la base de données réussie.');
            return;
        } catch (err) {
            console.log(`BDD non disponible (${i + 1}/${retries}) : ${err.message}`);
            if (i === retries - 1) throw err;
            await new Promise(res => setTimeout(res, delay));
        }
    }
}

async function startServer() {
    try {
        console.log('DB_HOST=', process.env.DB_HOST);
        console.log('DB_USER=', process.env.DB_USER);

        await waitForDatabase(15, 2000);
        await db.sync({ alter: true });
        console.log("Base de données synchronisée.");

        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Order-API en ligne sur le port ${PORT}`);
        });
    } catch (error) {
        console.error("Erreur au démarrage :", error);
        process.exit(1);
    }
}

startServer();
