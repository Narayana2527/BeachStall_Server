const express = require('express');
const router = express.Router();
const { createOrder, getMyOrders,getAllOrders } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

// Change these to match your orderService calls
router.get('/myorders', protect, getMyOrders);
router.get('/allorders', protect, getAllOrders);
router.post('/create', protect, createOrder);

module.exports = router;