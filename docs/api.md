# Documentation des APIs

Ce document expose les endpoints disponibles par service, avec une fiche pour chaque route (méthode, chemin, paramètres, exemples). 

Base URLs locales
- user-api : http://localhost:5001
- product-api : http://localhost:5002
- order-api : http://localhost:5003

Format d'une fiche d'endpoint
1. Endpoint : [MÉTHODE] `/...`
2. Description : courte phrase
3. Paramètres : Path / Query / Body (type, requis)
4. Exemple de requête (curl)
5. Exemple de réponse réussie
6. Codes d'erreur courants

---

## Service : user-api (port 5001)

### GET /users
- Description : Récupère la liste des utilisateurs (sans le hash du mot de passe).
- Paramètres : aucun
- Exemple :

curl http://localhost:5001/users

- Réponse 200 :

{"users": [ {"id":1, "email":"ex@example.com", "username":"ex"} ]}

- Erreurs : 500 (internal server error)

### GET /users/:id
- Description : Récupère un utilisateur par son id.
- Paramètres : path `id` (number, requis)
- Exemple :

curl http://localhost:5001/users/1

- Réponse 200 :

{"user": {"id":1, "email":"ex@example.com", "username":"ex"}}

- Erreurs : 404 (user not found), 500

### POST /users/create
- Description : Crée un nouvel utilisateur.
- Paramètres body (JSON) :
  - email (string, requis)
  - password (string, requis)
  - username (string, optionnel)
- Exemple :

curl -X POST http://localhost:5001/users/create -H "Content-Type: application/json" -d "{\"email\":\"a@b.com\", \"password\":\"secret\", \"username\":\"demo\"}"

- Réponse 201 :

{"user": {"id":2, "email":"a@b.com", "username":"demo"}}

- Erreurs : 400 (missing fields), 409 (duplicate email/username), 500

### PUT /users/:id
- Description : Met à jour l'email et/ou le username d'un utilisateur.
- Paramètres : path `id` (number, requis)
- Body JSON : { "email": "nouvel@email", "username": "nouveau" }
- Exemple :

curl -X PUT http://localhost:5001/users/1 -H "Content-Type: application/json" -d "{\"username\":\"newname\"}"

- Réponse 200 : message + user mis à jour
- Erreurs : 404, 409, 500

### DELETE /users/:id
- Description : Supprime un utilisateur.
- Paramètres : path `id` (number, requis)
- Exemple :

curl -X DELETE http://localhost:5001/users/1

- Réponse 200 : {"message":"User deleted successfully"}
- Erreurs : 404, 500

### POST /users/login
- Description : Authentifie un utilisateur (email + password). Retourne l'utilisateur sans hash.
- Body JSON : { "email": "a@b.com", "password": "secret" }
- Exemple :

curl -X POST http://localhost:5001/users/login -H "Content-Type: application/json" -d "{\"email\":\"a@b.com\",\"password\":\"secret\"}"

- Réponse 200 : {"message":"Login successful","user":{...}}
- Erreurs : 400 (missing fields), 401 (invalid email or password), 500

### GET /health
- Description : Vérifie l'état du service
- Exemple : curl http://localhost:5001/health
- Réponse : {"status":"ok"}

---

## Service : product-api (port 5002)

### GET /products
- Description : Récupère la liste des produits.
- Exemple : curl http://localhost:5002/products
- Réponse 200 : [ {"id":1, "name":"Produit", "price":9.9, "stock":10} ]

### GET /products/:id
- Description : Récupère un produit par id.
- Paramètres : path `id`
- Exemple : curl http://localhost:5002/products/1
- Réponse 200 : {"id":1, "name":"Produit", "price":9.9, "stock":10}
- Erreurs : 404, 500

### POST /products
- Description : Crée un produit.
- Body JSON : { "name": "Nom", "price": 9.9, "stock": 10 }
- Exemple :

curl -X POST http://localhost:5002/products -H "Content-Type: application/json" -d "{\"name\":\"N\",\"price\":9.9,\"stock\":10}"

- Réponse 201 : objet produit créé
- Erreurs : 400 (validation), 500

### PUT /products/:id
- Description : Met à jour un produit.
- Body JSON : champs à mettre à jour (name, price, stock)
- Exemple : curl -X PUT http://localhost:5002/products/1 -H "Content-Type: application/json" -d "{\"price\":8.5}"
- Réponse 200 : produit mis à jour

### DELETE /products/:id
- Description : Supprime un produit.
- Exemple : curl -X DELETE http://localhost:5002/products/1
- Réponse 204 (no content)

### GET /health
- Description : Vérifie l'état du service
- Exemple : curl http://localhost:5002/health
- Réponse : {"status":"ok"}

---

## Service : order-api (port 5003)

### GET /orders
- Description : Liste toutes les commandes.
- Exemple : curl http://localhost:5003/orders
- Réponse 200 : [ {"id":1, "user_id":1, "product_id":2, "quantity":1, "total_price":9.9} ]

### GET /orders/:id
- Description : Récupère une commande par id.
- Exemple : curl http://localhost:5003/orders/1
- Réponse 200 : commande
- Erreurs : 404, 500

### POST /orders
- Description : Crée une commande.
- Body JSON requis : { "user_id": <number>, "product_id": <number>, "quantity": <number>, "total_price": <number>, "status": <string?> }
- Exemple :

curl -X POST http://localhost:5003/orders -H "Content-Type: application/json" -d "{\"user_id\":1,\"product_id\":2,\"quantity\":1,\"total_price\":9.9}"

- Réponse 201 : commande créée
- Erreurs : 400 (missing fields), 500

### GET /orders/user/:user_id
- Description : Récupère les commandes d'un utilisateur donné.
- Paramètres : path `user_id` (number)
- Exemple : curl http://localhost:5003/orders/user/1
- Réponse 200 : liste de commandes

### GET /health
- Description : Vérifie l'état du service
- Exemple : curl http://localhost:5003/health
- Réponse : {"status":"ok"}

---

## Maintenance de la documentation
- Mettre à jour ce fichier après toute modification des fichiers de routes (`src/*/route/*.js`) ou des contrôleurs.
- Optionnel : générer automatiquement une spec OpenAPI à partir des routes si besoin.

