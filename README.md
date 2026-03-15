# docker-sujet-1

## Equipe:
Mathis Lecocq, Mateo Gaspar

## Instructions de lancement (simple)

### Prérequis
- Docker et Docker Compose doivent être installés et Docker Desktop lancé (Windows).
- Ouvrir PowerShell et exécuter les commandes depuis la racine du projet.

### Build et démarrage
- Construire et démarrer tous les services (exécution depuis la racine) :

docker compose up -d --build

### Voir les logs
- Suivre tous les logs :

docker-compose logs -f

- Suivre les logs d'un service (ex. `user-api`) :

docker-compose logs -f user-api

### Arrêt et nettoyage
- Arrêter et supprimer les conteneurs :

docker-compose down

- Supprimer aussi les volumes :

docker-compose down -v

### Ports exposés
- Services et ports exposés (mappés hôte:conteneur) :
  - `user-api` : 5001
  - `product-api` : 5002
  - `order-api` : 5003
