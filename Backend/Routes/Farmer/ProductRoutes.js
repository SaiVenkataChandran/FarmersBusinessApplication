// routes/Farmer/ProductRoutes.js
const express = require("express");
const Product = require("../../Models/Products");
const router = express.Router();

// UPDATE product
router.put("/products/:id", async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updated);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update product", error: error.message });
  }
});

// ADD product (already in UploadProducts.js — you can also move it here for clarity if you want)
// DELETE product (you might already have this in another route)

module.exports = router;
