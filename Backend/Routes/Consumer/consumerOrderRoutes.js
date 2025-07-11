const {
  getOrdersByConsumerId,
  cancelOrder,
} = require("../../Controllers/Consumer/OrdersControllers");
const express = require("express");
const getConsOrderRouter = express.Router();
getConsOrderRouter.get("/orders/:consumerId", getOrdersByConsumerId);
getConsOrderRouter.put("/orders/cancel/:orderId", cancelOrder);
module.exports = getConsOrderRouter;
