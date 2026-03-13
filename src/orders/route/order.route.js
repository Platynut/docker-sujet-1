const express = require('express');
const ordersController = require('../controller/OrderController');

const router = express.Router();

router.get('/', ordersController.listOrders);
router.get('/:id', ordersController.getOrder);
router.post('/', ordersController.createOrder);
router.get('/user/:user_id', ordersController.getOrdersByUser);
router.get('/health', ordersController.health);

module.exports = router;
