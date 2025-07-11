// controllers/product/getPendingProducts.js
const Product = require("../../Models/Products");

const getPendingProducts = async (req, res) => {
  try {
    const pendingProducts = await Product.find({ isVerified: "Pending" });

    res.status(200).json(pendingProducts);
  } catch (err) {
    console.error("Error fetching pending products:", err);
    res
      .status(500)
      .json({ message: "Server error while fetching pending products." });
  }
};

module.exports = getPendingProducts;
