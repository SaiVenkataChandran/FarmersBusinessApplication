const {
  SendOtpFarm,
  SendOtpUser,
  SendOtpAdmin,
} = require(".././Controllers/SendOtpController");
const express = require("express");
const otpRouter = express.Router();
otpRouter.post("/send-otpfarm", SendOtpFarm);
otpRouter.post("/send-otpCons", SendOtpUser);
otpRouter.post("/send-otpadmin", SendOtpAdmin);

module.exports = otpRouter;
