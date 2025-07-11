// routes/farmerRoutes.js
const express = require("express");
const FetchPendingFarmers = express.Router();
const getPendingFarmers = require("../../Controllers/AdminControllers/FetchFarmersPending");
FetchPendingFarmers.get("/admin", getPendingFarmers);
module.exports = FetchPendingFarmers;
