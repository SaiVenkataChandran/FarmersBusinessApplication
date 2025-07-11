const getFinanceData = require("../../Controllers/Farmer/FarmerDashboardControllers");
const express = require("express");
const FarmerDashboardRouter = express.Router();
FarmerDashboardRouter.get("/financedashboardfarm/:farmerId", getFinanceData);
module.exports = FarmerDashboardRouter;
