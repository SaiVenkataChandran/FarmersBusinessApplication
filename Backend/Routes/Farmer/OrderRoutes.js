const getOrdersOfFarmer = require("../../Controllers/Farmer/OrdersControllers");
const express = require("express");
const OrderRouter = express.Router();
OrderRouter.get("/ordersfarms", getOrdersOfFarmer);
module.exports = OrderRouter;
