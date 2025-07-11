// controllers/farmerController.js
const Farmer = require("../../Models/Farmer");
const getPendingFarmers = async (req, res) => {
  try {
    const pendingFarmers = await Farmer.find({ isVerified: "Pending" });
    const formattedFarmers = pendingFarmers.map((farmer) => ({
      id: farmer.farmerId,
      name: farmer.fullName,
      email: farmer.email,
      phone: farmer.phone,
      status: farmer.isVerified,
    }));
    res.status(200).json(formattedFarmers);
  } catch (err) {
    console.error("Error fetching pending farmers:", err);
    res.status(500).json({ message: "Server error while fetching farmers." });
  }
};

module.exports = getPendingFarmers;
