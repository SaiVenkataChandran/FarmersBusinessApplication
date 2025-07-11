const generateOTP = require("../Controllers/OtpRequestControllers");
const express = require("express");
const router = express.Router();

router.post("/request-otp", generateOTP);

module.exports = router;
