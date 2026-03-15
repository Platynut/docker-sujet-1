const express = require('express');
const router = express.Router();
const UserController = require('../controller/UserController.js');

router.get('/users', UserController.getAllUsers);
router.get('/users/:id', UserController.getUserById);
router.post('/users/create', UserController.createUser);
router.put('/users/:id', UserController.updateUser);
router.delete('/users/:id', UserController.deleteUser);
router.post('/users/login', UserController.loginUser);

router.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

module.exports = router;