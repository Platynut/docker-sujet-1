const express = require('express');
const router = express.Router();
const UserController = require('../controller/UserController.js');

router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.post('/create', UserController.createUser);
router.put('/put/:id', UserController.updateUser);
router.delete('/delete/:id', UserController.deleteUser);
router.post('/login', UserController.loginUser);

router.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

module.exports = router;