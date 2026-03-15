const express = require('express');
const ordersController = require('../controller/OrderController');

const router = express.Router();

router.get('/orders', ordersController.listOrders);
router.get('/orders/:id', ordersController.getOrder);
router.post('/orders', ordersController.createOrder);
router.get('/orders/user/:user_id', ordersController.getOrdersByUser);
router.get('/health', ordersController.health);

module.exports = router;
