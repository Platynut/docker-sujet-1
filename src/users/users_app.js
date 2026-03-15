const express = require('express');
const app = express();
const db = require('./model/index');
const userRoutes = require('./route/user.route');
require('./model/user.model');

app.use(express.json());
app.use('/', userRoutes);

const PORT = 5001;

// Ajout : gestion d'attente/retry avant la synchronisation de la BDD
async function waitForDatabase(retries = 10, delay = 3000) {
    // Petite fonction utilitaire pour faire des tentatives de connexion successives
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
        // Debug rapide des variables d'environnement utiles
        console.log('DB_HOST=', process.env.DB_HOST);
        console.log('DB_USER=', process.env.DB_USER);

        // Attendre que la BDD soit prête
        await waitForDatabase(15, 2000);

        await db.sync({ alter: true });
        console.log("Base de données synchronisée.");

        app.listen(PORT, '0.0.0.0', () => {
            console.log(`User-API en ligne sur le port ${PORT}`);
        });
    } catch (error) {
        console.error("Erreur au démarrage :", error);
        process.exit(1);
    }
}

startServer();