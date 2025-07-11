const express = require("express");
const {
  getFarmerDetails,
  updateFarmer,
  getConsumerDetails,
} = require("../Controllers/GetprofileControllers");

const Profilerouter = express.Router();

Profilerouter.get("/farmers/:farmerId", getFarmerDetails);
Profilerouter.put("/farmersedit/:id", updateFarmer);
Profilerouter.get("/consumer-profile/:consumerId", getConsumerDetails);

module.exports = Profilerouter;
