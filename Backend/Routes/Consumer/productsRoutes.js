// Routes/Consumer/productsRoutes.js
const express = require("express");
const {
  getApprovedProducts,
} = require("../../Controllers/Consumer/ProductController");

const router = express.Router();

// Route: GET /api/consumer/products
router.get("/products", getApprovedProducts);

module.exports = router;
