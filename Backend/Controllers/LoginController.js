const Farmer = require("../Models/Farmer");
const Consumer = require("../Models/Consumer");
const Admins = require("../Models/Admin");

//farmerlogin
const loginFarmer = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(200).json({
      success: false,
      message: "Email and password are required.",
    });
  }

  try {
    const farmer = await Farmer.findOne({ email, password });

    if (!farmer) {
      console.log(farmer);
      return res.status(200).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    if (farmer.isVerified === "Pending") {
      return res.status(200).json({
        success: false,
        message: "Your registration is in pending state.",
        isVerified: "Pending",
      });
    }

    if (farmer.isVerified === "Rejected") {
      return res.status(200).json({
        success: false,
        message: "Your registration is rejected by admin.",
        isVerified: "Rejected",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Login successful",
      farmerId: farmer.farmerId,
    });
  } catch (error) {
    console.error("Farmer login error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// 🛒 Consumer Login
const loginConsumer = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(200).json({
      success: false,
      message: "Email and password are required.",
    });
  }

  try {
    const consumer = await Consumer.findOne({ email, password });

    if (!consumer) {
      return res.status(200).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Login successful",
      consumer,
    });
  } catch (error) {
    console.error("Consumer login error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// 👨‍💼 Admin Login
const loginAdmin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(200).json({
      success: false,
      message: "Username and password are required.",
    });
  }

  try {
    const admin = await Admins.findOne({ username, password });
    if (!admin) {
      return res.status(200).json({
        success: false,
        message: "Invalid username or password.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Login successful",
      admin,
    });
  } catch (error) {
    console.error("Admin login error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  loginFarmer,
  loginConsumer,
  loginAdmin,
};
