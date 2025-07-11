const Farmer = require("../../Models/Farmer");
const users = require("../../Models/Consumer");

// 📋 Display all farmers with name, ID, and verification status
const DisplayFarmers = async (req, res) => {
  try {
    const farmers = await Farmer.find({}, "fullName farmerId isVerified"); // Only selected fields
    res.status(200).json({ farmers });
  } catch (error) {
    console.error("Error fetching farmers:", error);
    res.status(500).json({ message: "Failed to fetch farmers." });
  }
};

// 📋 Display all user details
const DisplayUsers = async (req, res) => {
  try {
    const allUsers = await users.find(); // Returns everything
    res.status(200).json({ users: allUsers });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users." });
  }
};

module.exports = { DisplayFarmers, DisplayUsers };
