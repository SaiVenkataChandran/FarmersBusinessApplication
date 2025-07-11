const express = require("express");
const deleteProductRoute = express.Router();
const {
  getImageUrl,
  deleteProduct,
} = require("../../Controllers/Farmer/deleteProductControllers");

// Get image URL of product before deletion
deleteProductRoute.get("/products/image/:id", getImageUrl);

// Delete product
deleteProductRoute.delete("/products/:id", deleteProduct);

module.exports = deleteProductRoute;
