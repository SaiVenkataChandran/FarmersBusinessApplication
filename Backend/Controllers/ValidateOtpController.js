const users = require("../Models/Consumer.js");
const Farmers = require("../Models/Farmer.js");
const Admins = require("../Models/Admin.js");

// Validate OTP for Consumer (User)
const OtpconsValidate = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(200).json({
        verified: false,
        message: "Email and OTP are required",
      });
    }

    const user = await users.findOne({ email });
    if (!user) {
      return res.status(200).json({
        verified: false,
        message: "User not found",
      });
    }

    if (user.otp !== otp) {
      return res.status(200).json({
        verified: false,
        message: "Invalid OTP",
      });
    }

    if (!user.otpExpiresAt || Date.now() > user.otpExpiresAt) {
      return res.status(200).json({
        verified: false,
        message: "OTP expired",
      });
    }

    return res.status(200).json({
      verified: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    console.error("OtpconsValidate Error:", error);
    return res.status(200).json({
      verified: false,
      message: "OTP validation failed",
    });
  }
};

// Validate OTP for Farmer
const OtpfarmValidate = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(200).json({
        verified: false,
        message: "Email and OTP are required",
      });
    }

    const farmer = await Farmers.findOne({ email });
    if (!farmer) {
      return res.status(200).json({
        verified: false,
        message: "Farmer not found",
      });
    }

    if (farmer.otp !== otp) {
      return res.status(200).json({
        verified: false,
        message: "Invalid OTP",
      });
    }

    if (!farmer.otpExpiresAt || Date.now() > farmer.otpExpiresAt) {
      return res.status(200).json({
        verified: false,
        message: "OTP expired",
      });
    }

    return res.status(200).json({
      verified: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    console.error("OtpfarmValidate Error:", error);
    return res.status(200).json({
      verified: false,
      message: "OTP validation failed",
    });
  }
};

// Validate OTP for Admin
const OtpAdminValidate = async (req, res) => {
  const { username, otp } = req.body;

  if (!username || !otp) {
    return res.status(200).json({
      verified: false,
      message: "Username and OTP are required",
    });
  }

  try {
    const admin = await Admins.findOne({ username });

    if (!admin) {
      return res.status(200).json({
        verified: false,
        message: "Admin not found",
      });
    }

    if (!admin.otp || !admin.otpExpiry) {
      return res.status(200).json({
        verified: false,
        message: "OTP not generated or expired",
      });
    }

    if (admin.otp !== otp) {
      return res.status(200).json({
        verified: false,
        message: "Invalid OTP",
      });
    }

    if (admin.otpExpiry < Date.now()) {
      return res.status(200).json({
        verified: false,
        message: "OTP has expired",
      });
    }

    admin.otp = undefined;
    admin.otpExpiry = undefined;
    await admin.save();

    return res.status(200).json({
      verified: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    console.error("OtpAdminValidate Error:", error);
    return res.status(200).json({
      verified: false,
      message: "Server error during OTP verification",
    });
  }
};

module.exports = {
  OtpconsValidate,
  OtpfarmValidate,
  OtpAdminValidate,
};
