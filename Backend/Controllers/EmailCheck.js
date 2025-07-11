const Farmer = require("../Models/Farmer");
const users = require("../Models/Consumer");
const Admins = require("../Models/Admin");

// Check if consumer email exists
const checkEmailExistsCons = async (req, res) => {
  const { email } = req.body;

  // Check if email is missing
  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  try {
    const customer = await users.findOne({ email });

    if (!customer) {
      console.log("Email not found", customer);
      return res.status(404).json({ message: "Email not found." });
    }

    console.log("Customer email found:", customer.email);
    return res
      .status(200)
      .json({ message: "Email exists", customerId: customer._id });
  } catch (error) {
    console.error("Error checking email:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Check if farmer email exists
const checkEmailExistsFarm = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  try {
    const farmer = await Farmer.findOne({ email });

    if (!farmer) {
      console.log("Email not found", farmer);
      return res.status(404).json({ message: "Email not found." });
    }

    console.log("Farmer email found:", farmer.email);
    return res
      .status(200)
      .json({ message: "Email exists", farmerId: farmer._id });
  } catch (error) {
    console.error("Error checking email:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
const CheckAdminExists = async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ message: "Username is required." });
    }

    const admin = await Admins.findOne({ username });
    console.log(admin);
    if (admin) {
      return res.status(200).json({ message: "Admin exists" });
    } else {
      return res.status(200).json({ message: "Admin not found" });
    }
  } catch (error) {
    console.error("Error checking admin:", error);
    res.status(500).json({ message: "Server error" });
  }
};
const checkEmailExistsFarmR = async (req, res) => {
  console.log(req.body);
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  try {
    const farmer = await Farmer.findOne({ email });

    if (farmer) {
      return res
        .status(409)
        .json({ message: "Email already exists", exists: true });
    } else {
      return res
        .status(200)
        .json({ message: "Email not found", exists: false });
    }
  } catch (error) {
    console.error("Error checking farmer email during registration:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// ✅ Check if consumer email exists during registration
const checkEmailExistsConsR = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  try {
    const consumer = await users.findOne({ email });

    if (consumer) {
      return res.status(409).json({ message: "Email already exists" });
    } else {
      return res.status(200).json({ message: "Email not found" });
    }
  } catch (error) {
    console.error("Error checking consumer email during registration:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  checkEmailExistsFarm,
  checkEmailExistsCons,
  CheckAdminExists,
  checkEmailExistsConsR,
  checkEmailExistsFarmR,
};
