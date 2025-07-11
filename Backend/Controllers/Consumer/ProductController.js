// Controllers/Consumer/ProductsController.js
const Product = require("../../Models/Products");

// Get all approved products
const getApprovedProducts = async (req, res) => {
  try {
    const products = await Product.find({ isVerified: "Approved" });
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getApprovedProducts,
};
