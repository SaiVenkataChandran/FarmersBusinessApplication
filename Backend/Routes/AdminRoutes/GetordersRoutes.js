const express = require("express");
const AdminProductsrouter = express.Router();
const getOrders = require("../../Controllers/AdminControllers/Getorderscontrollers");
AdminProductsrouter.get("/admin/orders", getOrders);
module.exports = AdminProductsrouter;
