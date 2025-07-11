// routes/UserController.js or similar
const Admins = require("../Models/Admin.js");
const Users = require("../Models/Consumer.js");
const Farmers = require("../Models/Farmer.js");

const resetFarmerPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const farmer = await Farmers.findOne({ email });

    if (!farmer) {
      return res
        .status(404)
        .json({ success: false, message: "Farmer not found" });
    }

    farmer.password = newPassword; // No bcrypt hash

    await farmer.save();

    return res.json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const resetUserPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const user = await Users.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    user.password = newPassword; // No bcrypt hash

    await user.save();

    return res.json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
const resetAdminPassword = async (req, res) => {
  const { username, newPassword } = req.body;

  if (!username || !newPassword) {
    return res.status(200).json({
      success: false,
      message: "Username and new password are required",
    });
  }

  try {
    const admin = await Admins.findOne({ username });

    if (!admin) {
      return res.status(200).json({
        success: false,
        message: "Admin not found",
      });
    }

    // Directly update the password (plain text)
    admin.password = newPassword;

    // Optional: clear OTP fields
    admin.otp = undefined;
    admin.otpExpiry = undefined;

    // Save the updated admin
    await admin.save();

    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (err) {
    console.error("resetAdminPassword Error:", err);
    return res.status(200).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = { resetFarmerPassword, resetUserPassword, resetAdminPassword };
