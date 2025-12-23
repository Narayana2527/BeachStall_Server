const express = require("express");
const cors = require("cors")
const path = require("path")
const bodyParser = require("body-parser");
const bookingRoutes = require('./routes/bookingRoutes');
const userRoutes = require('./routes/userRoutes')
const authRoutes = require('./routes/authRoutes');
const cartRoutes = require('./routes/cartRoutes')
const productRoutes = require('./routes/productRoutes')
const orderRoutes = require('./routes/orderRoutes')
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const PORT = process.env.PORT || 5000
const app = express();
dotenv.config();
connectDB();

// Middleware
app.use(express.json());
app.use(cors({
  origin: "https://beach-stall-client.vercel.app/", // React frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
// Routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/product", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api", bookingRoutes);
app.get('/', (req, res) => {
    res.status(200).json({ message: "API is working fine!" });
});
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})

