const express = require("express");
const addfarmer = require("../../Controllers/Farmer/FarmerConrollers");
const farmerRouter = express.Router();
farmerRouter.post("/addfarmer", addfarmer);
module.exports = farmerRouter;
