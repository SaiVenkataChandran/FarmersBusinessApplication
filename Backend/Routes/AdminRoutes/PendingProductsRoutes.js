const express = require("express");
const PendingProductrouter = express.Router();
const getPendingProducts = require("../../Controllers/AdminControllers/PendingProductsControllers");
PendingProductrouter.get("/pending-products", getPendingProducts);
module.exports = PendingProductrouter;
