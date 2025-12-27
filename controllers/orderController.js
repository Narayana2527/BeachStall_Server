const Order = require("../model/orderModel");
const Cart = require("../model/cartModel");

module.exports = {
  createOrder: async (req, res) => {
    try {
      const { orderItems, shippingAddress, totalPrice, paymentMethod } = req.body;

      if (!orderItems || orderItems.length === 0) {
        return res.status(400).json({ message: "No order items" });
      }

      const order = new Order({
        userId: req.user._id, // Store the full ID
        orderItems,
        shippingAddress,
        totalPrice,
        paymentMethod,
        isPaid: true,
        paidAt: Date.now(),
        status: "Pending" // Explicitly set default status
      });

      const createdOrder = await order.save();
      await Cart.findOneAndDelete({ userId: req.user._id });

      res.status(201).json(createdOrder);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getMyOrders: async (req, res) => {
    try {
      // POPULATE 'userId' to get name and email
      const orders = await Order.find({ userId: req.user._id })
        .populate("userId", "name email") 
        .sort({ createdAt: -1 });

      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getAllOrders: async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("userId", "name email")
      .sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
};