const OrderModel = require('../models/orderModel');

exports.listOrders = async (req, res) => {
  try {
    const orders = await OrderModel.findAll();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOrder = async (req, res) => {
  try {
    const order = await OrderModel.findById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOrdersByUser = async (req, res) => {
  try {
    const orders = await OrderModel.findByUserId(req.params.user_id);
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const { user_id, product_id, quantity, total_price, status } = req.body;
    const order = await OrderModel.create(user_id, product_id, quantity, total_price, status);
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.health = (req, res) => {
  res.json({ status: 'ok' });
};
