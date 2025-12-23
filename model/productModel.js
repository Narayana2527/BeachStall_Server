// models/productModel.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true }, // e.g., 'Main Course', 'Drinks'
  image: { type: String, required: true },    // URL or file path
  countInStock: { type: Number, required: true, default: 0 },
  isFeatured: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);