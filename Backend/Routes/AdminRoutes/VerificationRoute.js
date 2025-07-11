const {
  approveFarmer,
  rejectFarmer,
} = require("../../Controllers/AdminControllers/VerificationController");
const express = require("express");
const verificationroutes = express.Router();
verificationroutes.post("/farmers/:id/approve", approveFarmer);
verificationroutes.post("/farmers/:id/reject", rejectFarmer);
module.exports = verificationroutes;
