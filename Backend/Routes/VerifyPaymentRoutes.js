const express = require("express");
const Verifypaymentrouter = express.Router();
const verifyPayment = require("../Controllers/VerifyPaymentsControllers");

Verifypaymentrouter.post("/payment/verify", verifyPayment);

module.exports = Verifypaymentrouter;
