const updateOrderStatus = require("../../Controllers/AdminControllers/UpdateOrderStatusControllers");
const express = require("express");
const UpdateOrderStatusRoutes = express.Router();
UpdateOrderStatusRoutes.patch("/orders/:orderId", updateOrderStatus);
module.exports = UpdateOrderStatusRoutes;
