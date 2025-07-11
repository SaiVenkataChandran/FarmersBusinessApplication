const {
  OtpconsValidate,
  OtpfarmValidate,
  OtpAdminValidate,
} = require("../Controllers/ValidateOtpController");
const express = require("express");
const ValidateOtp = express.Router();
ValidateOtp.use("/verify-otpCons", OtpconsValidate);
ValidateOtp.use("/verify-otpfarm", OtpfarmValidate);
ValidateOtp.use("/verify-otpadmin", OtpAdminValidate);
module.exports = ValidateOtp;
