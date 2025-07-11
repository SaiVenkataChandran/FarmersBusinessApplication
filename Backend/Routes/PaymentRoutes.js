const createOrder = require("../Controllers/PaymentsControllers");
const express = require("express");
const PaymentRoute = express.Router();
PaymentRoute.post("/payment/order", createOrder);
module.exports = PaymentRoute;
