const getPayments = require("../../Controllers/AdminControllers/TransactionControllers");
const express = require("express");
const getPaymentsRouter = express.Router();
getPaymentsRouter.get("/tansactions", getPayments);
module.exports = getPaymentsRouter;
