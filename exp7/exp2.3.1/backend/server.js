const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/productsDB")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Schema
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
});

const Product = mongoose.model("Product", productSchema);

// =============================
// GET: Fetch all products
// =============================
app.get("/api/products", async (req, res) => {
  try {
    const data = await Product.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

// =============================
// POST: Add new product (Postman)
// =============================
app.post("/api/products", async (req, res) => {
  try {
    const { name, price } = req.body;

    const newProduct = new Product({ name, price });
    await newProduct.save();

    res.json({
      message: "Product Added Successfully",
      data: newProduct,
    });
  } catch (err) {
    res.status(500).json({ error: "Error adding product" });
  }
});

// =============================
// OPTIONAL: Sample data insert
// =============================
app.get("/add", async (req, res) => {
  await Product.insertMany([
    { name: "Laptop", price: 50000 },
    { name: "Phone", price: 20000 },
  ]);
  res.send("Sample Data Added");
});

// =============================
// Server start
// =============================
app.listen(5000, () => {
  console.log("Server running on port 5000");
});