# Architecture du projet


Résumé des services

| Service | Port (hôte) | Dossier source |
|---|---:|---|
| user-api | 5001 | `src/users` |
| product-api | 5002 | `src/products` |
| order-api | 5003 | `src/orders` |
| user-db | (interne) | MySQL (volume `user_db_data`) |
| product-db | (interne) | MySQL (volume `product_db_data`) |
| order-db | (interne) | MySQL (volume `order_db_data`) |

Notes
- Exécuter les services depuis la racine du projet (là où se trouve `docker-compose.yml`).
- Chaque API expose un endpoint `/health` pour vérifier l'état du service.
- Les bases de données utilisent l'image `mysql:8.0` et des volumes persistants nommés (voir tableau).
