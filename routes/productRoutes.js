const express = require("express");
const router = express.Router();
const { getProducts, getProductById, createProduct } = require("../controllers/productController");
const upload = require('../middleware/uploadMiddleware');
// Public routes
router.get("/getProducts", getProducts);
router.get("/getProducts:id", getProductById);

// Protected/Admin route (Add your auth middleware here later)
router.post("/addProduct",upload.single('image'), createProduct);

module.exports = router;