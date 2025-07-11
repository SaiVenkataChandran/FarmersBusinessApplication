const express = require("express");
const Addcartrouter = express.Router();
const {
  addToCart,
  getCartDetails,
  updateCartQuantity,
  deleteCartItem,
} = require("../../Controllers/Consumer/AddtoCartControllers");
// POST /api/cart/add
Addcartrouter.use("/cart/add", addToCart);
Addcartrouter.get("/cart/:consumerId", getCartDetails);
Addcartrouter.patch("/cart/:consumerId/:productId", updateCartQuantity);
Addcartrouter.delete("/cart/:consumerId/:productId", deleteCartItem);
module.exports = Addcartrouter;
