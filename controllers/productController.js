const Product = require("../model/productModel");

module.exports = {
  // Get all products
  getProducts: async (req, res) => {
    try {
      const products = await Product.find({});
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get single product by ID
  getProductById: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Create a product (Admin logic)
  createProduct: async (req, res) => {
    try {
      // 1. Destructure text data from req.body
      const { name, description, price, category, countInStock, isFeatured } = req.body;

      // 2. Check if a file was uploaded by multer
      if (!req.file) {
        return res.status(400).json({ success: false, message: "Please upload an image" });
      }

      // 3. Create a new product instance
      // Note: we take the path from req.file provided by multer
      const product = new Product({
        name,
        description,
        price,
        category,
        image: req.file.path, // Stores the relative path to the image
        countInStock,
        isFeatured
      });

      // 4. Save to MongoDB
      const savedProduct = await product.save();

      res.status(201).json({
        success: true,
        message: "Product created successfully",
        data: savedProduct
      });
      
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        message: error.message 
      });
    }
  }
}