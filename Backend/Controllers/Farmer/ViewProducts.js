const Product = require("../../Models/Products");

// ✅ Get products by farmer ID
const getProductsByFarmer = async (req, res) => {
  try {
    const { farmerId } = req.body; // Accept farmerId from request body
    //console.log(farmerId);
    const products = await Product.find({ farmerId });
    console.log(products);
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = getProductsByFarmer;
