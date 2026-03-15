const OrderModel = require('../model/order.model');

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
    const order = await OrderModel.findByPk(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOrdersByUser = async (req, res) => {
  try {
    const orders = await OrderModel.findAll({ where: { user_id: req.params.user_id } });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const { user_id, product_id, quantity, total_price, status } = req.body;
    if (!user_id || !product_id || total_price === undefined || total_price === null) {
      return res.status(400).json({ error: 'user_id, product_id and total_price are required' });
    }
    const order = await OrderModel.create({ user_id, product_id, quantity, total_price, status });
    res.status(201).json(order);
  } catch (err) {
    if (err.name && (err.name === 'SequelizeValidationError' || err.name === 'SequelizeDatabaseError')) {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: err.message });
  }
};

exports.health = (req, res) => {
  res.json({ status: 'ok' });
};
